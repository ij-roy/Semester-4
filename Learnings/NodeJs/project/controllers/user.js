const User = require('../models/user');


async function handleGetAllusers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUserbyId(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ status: 'success', message: `User ${req.params.id} deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}

async function handleCreateNewUser(req, res) {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });

    console.log(result);
    return res.status(201).json({ status: 'success', id: result._id, result });
}

module.exports = { handleGetAllusers, handleGetUserbyId, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser };
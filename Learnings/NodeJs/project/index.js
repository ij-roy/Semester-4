const express = require('express');
const fs = require('fs');

const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user');
const { logReqRes } = require('./middlewares');


const app = express();
const port = 8000;

//Connect to MongoDB
connectMongoDb('mongodb://127.0.0.1:27017/').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to log requests
app.use(logReqRes('log.txt'));

// Routes
app.use('/api/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//URL Shortner
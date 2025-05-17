const { getUser } = require('../services/auth');


function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) 
        return next();
    

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();  
}
// role can be 'admin' , 'user' etc
function restrictTo(roles = []){
    return function(req, res, next){
        if (!req.user) return res.redirect('/login');
    

    if (!roles.includes(req.user.role)) {
        return res.end("UnAuthorized");
    }

    next();
}
}



module.exports = {
    checkForAuthentication,
    restrictTo
};

/**
 async function restrictToLoggedInUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid;
    const userUid = req.headers['Authorization']
    console.log(userUid)

    if (!userUid) {
        return res.redirect('/login');
    }
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);

    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid;
    console.log(req.headers)
    const userUid = req.headers['authorization']
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);

    req.user = user;
    next();
}
 */
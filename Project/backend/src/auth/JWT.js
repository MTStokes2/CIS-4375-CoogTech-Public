const {sign, verify} = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const createToken = (user) => {
    let userId;
    if (user.userType === 'customer') {
        userId = user.CustomerID;
    } else if (user.userType === 'admin') {
        userId = user.AdminID;
    } else {
        throw new Error('Invalid user type');
    }

    const payload = {
        userId: user.userId,
        username: user.username,
        role: user.userType,
    };

    const token = sign(payload, secret_key, { expiresIn: '1h' });

    return token;
};


const validateToken = (req, res, next) => {
    const accessToken = req.cookie['access-token']; 

    if (!accessToken) {
        return res.status(401).json({ error: "Access Denied (Not Authenticated)" });
    }

    try {
        const validToken = verify(accessToken, secret_key);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" }); 
    }
};

module.exports = { createToken, validateToken }
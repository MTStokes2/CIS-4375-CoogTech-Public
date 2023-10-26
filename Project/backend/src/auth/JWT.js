const {sign, verify} = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const createToken = (user) => {
    const token = sign({ userId: user.CustomerID, username: user.Username }, secret_key, { expiresIn: '1h' });

    return token
}


const validateToken = ( req, res, next) => {
    const accessToken = req.cookie['access-token']

    if (!accessToken) return res.status(400).json( {error: "Access Denied (Not Authenticated)"})

    try {
        const validToken = verify(accessToken, secret_key)
        if (validToken) {
            req.authenticated = true
            return next()
        }

    } catch(err) {
        return res.status(400).json( {err} )
    }
}

module.exports = { createToken, validateToken }
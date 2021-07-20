const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async (req, res, next) => {
    const token = req.header("jwt_token")
    if(!token){
        return res.status(403).json({error: "Authorization denied"})
    }
    try{
        const verify = jwt.verify(token, process.env.jwtSecret)
        req.user = verify.user
        next()
    } catch(err){
        console.error(err.message)
        res.status(401).json({error: "Token invalid"})
    }
}
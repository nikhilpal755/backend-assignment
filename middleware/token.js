const jwt = require("jsonwebtoken");
require("dotenv").config();
 const verifyToken = async(req, res, next) => {
    let token = req.headers['authorization'];
    // console.log("token: ", token)
    // console.log("req: ", req.headers
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("token: ", token)
    console.log(process.env.JWT_SECRET)

   token = token.replace(/^Bearer\s/, '');

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode: ",decode)
        req.userId = decode.userId;
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { verifyToken }
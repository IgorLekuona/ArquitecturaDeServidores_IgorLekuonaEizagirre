const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        let token = authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
         return res.status(401).json({message : "Unauthorized", error : err});
    }
}
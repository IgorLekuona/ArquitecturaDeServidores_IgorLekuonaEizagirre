const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        let token = authorization.split("Bearer ")[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.sub;
        next();
    } catch (err) {
         return res.status(401).json({message : "Unauthorized", error : err});
    }
}
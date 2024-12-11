const jwt = require("jsonwebtoken")
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    console.log("The jwt admin secret is:", process.env.JWT_ADMIN_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not signed in "
        })
    }

}

module.exports = {
    adminMiddleware
}














































































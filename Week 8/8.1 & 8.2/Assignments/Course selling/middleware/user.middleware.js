const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());


function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_SECRET);

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

/* const token = req.headers.token;
   const decoded = jwt.verify(token, JWT_USER_SECRET);

   if (decoded) {
       req.userId = decoded.id;
       next();
   }
   else {
       res.status(403).json({
           message: "You are not signed in "
       })
   } */

function userMiddlewareWithCookie(req, res, next) {

    /* const token = req.cookies.access_token */;
    const token = req.cookies?.access_token;
    console.log("The token from middleware is: ", token)
    if (!token) {
        res.status(403).json({
            message: "Token not present"
        })
    }

    try {
        const decoded = jwt.verify(token, "dd82nd");
        console.log(decoded)
        if (decoded) {
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not signed in "
            })
        }

    } catch (error) {
        console.log("Error is: ", error)
    }

}

module.exports = {
    userMiddleware, userMiddlewareWithCookie
}





































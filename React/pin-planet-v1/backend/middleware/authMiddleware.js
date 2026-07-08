const jwt = require("jsonwebtoken");
const User = require("../models/user");


async function authToken(req, res, next) {
    console.log("Cookie header:", req.headers.cookie);
    console.log("Cookies:", req.cookies);


    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authToken;
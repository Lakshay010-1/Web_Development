import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protect = async (req, res, next) => {

    try {
        let token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.render("register", { "error": "No token, Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const curUser = await User.findById(decodedToken?.id).select("-password -refreshToken");
        if (!curUser) {
            return res.render("register", { "error": "Invalid Access Token, User not found" });
        }
        req.user = curUser;
        next();
    } catch (err) {
        return res.status(401).render("register", { message: "Not authorized, token failed" });
    }

    if (!token) return res.status(401).render("register", { message: "Not authorized, no token" });
};

export default protect;

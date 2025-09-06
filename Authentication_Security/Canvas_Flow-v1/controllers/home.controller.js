import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const signInUser = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.render("sketch");
    }
    // needs cookie-parser middleware
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if (token) {
        try {
            // verify the JWT token with your secret key
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            return res.render("sketch");
        } catch (err) {
            console.error("Invalid access-token:", err.message);
        }
    }
    res.render("login");
};

const signUpUser = (req, res) => {
    res.render("register");
}

const signOutUser = async (req, res, next) => {
    let user = req.user; // session-based user

    // If no session user, try to decode JWT
    if (!user) {
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                user = decoded;
            } catch (err) {
                res.render("register", { "message": `Invalid token during logout:, ${err.message}` });
            }
        }
    }

    // Passport session logout
    req.logout(function (err) {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }

        // Clear cookies
        const cookieOption = { httpOnly: true, secure: true };
        res.clearCookie("accessToken", cookieOption);
        res.clearCookie("refreshToken", cookieOption);

        // Remove refresh token from DB if session/JWT user found
        if (user?._id) {
            User.findByIdAndUpdate(
                user._id,
                { $unset: { refreshToken: 1 } },
                { new: true }
            ).catch(console.error);
        }

        res.redirect("/");
    });

}

export { signInUser, signUpUser, signOutUser };
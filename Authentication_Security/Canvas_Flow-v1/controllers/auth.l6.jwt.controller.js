import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: "../.env" });

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId });
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating referesh and access token")
    }
}

const authorizeJWT = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        //     const user = await User.findOne({
        //      $or: [{username}, {email}]
        //     })
        if (user && (await user.matchPassword(password))) {
            const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

            const options = {
                httpOnly: true,
                secure: true
            };

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .render("sketch");
        } else {
            res.render("register", { message: "Invalid email or password" });
        }
    } catch (err) {
        console.error("Lvl6 Auth error:", e.message);
        res.render("register", { message: err.message });
    }
};

const registerJWT = async (req, res) => {
    try {
        const { email, displayName, password } = req.body;
        if ([email, displayName, password].some((field) => field?.trim() === "")) {
            res.render("register");
        }
        const userExists = await User.findOne({ email });
        //     const userExists = await User.findOne({  
        //      $or: [{username}, {email}]
        //     })
        if (userExists) {
            res.render("login");
        }
        // Hashing + Salting password with bcrypt
        let hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        await User.create({ email, password: hashPassword });
        res.render("login");
    } catch (err) {
        console.error("Lvl6 Register error:", e.message);
        res.render("register");
    }
};

export { registerJWT, authorizeJWT };
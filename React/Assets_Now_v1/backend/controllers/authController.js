import bcrypt from "bcrypt";
import User from "../models/User.js";
import ListAsset from "../models/ListAsset.js";
import jwt from "jsonwebtoken";

const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(409).json({ message: "User already exists", field: "email" });
        }
        const PASSWORD_SALT = Number(process.env.PASSWORD_SALT);
        const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);
        const registeredUser = await User.create({ name, email, password: hashedPassword })
        const userResponse = registeredUser.toObject();
        delete userResponse.password;
        return res.status(201).json({ message: "User created successfully", user: userResponse });
    } catch (error) {
        return res.status(500).json({ message: "Error registering User", error: error.message });
    }


};

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials", exists: false, field: "email" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(409).json({ message: "Invalid Credentials", field: "password", exists: isPasswordCorrect });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",

            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: "Valid user", user, exists: isPasswordCorrect });
    } catch (error) {
        res.status(500).json({ message: "Error registering User" });
    }
};

const signOutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Logged Out" });
}


const deleteUser = async (req, res) => {
    const { user } = req.query;
    try {
        await ListAsset.deleteMany({ user });

        const deleteUser = await User.deleteOne({ email: user });
        if (deleteUser.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "User Deleted Successfully" });
};

export {
    signInUser,
    signUpUser,
    signOutUser,
    deleteUser
}
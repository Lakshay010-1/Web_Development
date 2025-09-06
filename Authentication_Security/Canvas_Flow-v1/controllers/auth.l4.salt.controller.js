import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const authorizeSalt = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error("User not found");
            return res.render("login", { error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.render("sketch"); // login successful
        } else {
            console.error("Wrong password");
            return res.render("login", { error: "Wrong password" });
        }
    } catch (e) {
        console.error("Lvl4 Auth error:", e.message);
        return res.render("login", { error: "Invalid login" });
    }
};

const registerSalt = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const u = new User({ email, password: hash });
        await u.save();
        return res.render("login");
    } catch (e) {
        console.error("Lvl4 Register error:", e.message);
        return res.render("register", { error: "User already exists or registration failed" });
    }
};


export { registerSalt, authorizeSalt };
import { User } from "../models/user.model.js";
import md5 from "md5";

const authorizeHash = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        if (user.password === md5(password)) {
            return res.render("sketch");
        }
        return res.render("register", { error: "Wrong password" });
    } catch (e) {
        console.error("Lvl3 Auth error:", e.message);
        return res.render("register", { error: "Invalid login" });
    }
};

const registerHash = async (req, res) => {
    const { email, password } = req.body;
    const u = new User({ email, password: md5(password) });
    try {
        await u.save();
        res.render("login");
    } catch (e) {
        console.error("Lvl3 Register error:", e.message);
        res.render("register", { error: "User already exists" });
    }
};

export { authorizeHash, registerHash };
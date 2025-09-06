import { User } from "../models/user.model.js";

const authorizeBasic = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        if (user.password === password) {
            return res.render("sketch");
        }
        return res.render("register", { error: "Wrong password" });
    } catch (e) {
        console.error("Lvl1 Auth error:", e.message);
        return res.render("register", { error: "Invalid credentials" });
    }
};

const registerBasic = async (req, res) => {
    const { email, password } = req.body;
    const u = new User({ email, password });
    try {
        await u.save();
        res.render("login");
    } catch (e) {
        console.error("Lvl1 Register error:", e.message);
        res.render("register", { error: "User already exists" });
    }
};

export { registerBasic, authorizeBasic };
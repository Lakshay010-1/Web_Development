import { User } from "../models/user.model.js";
import { UserMetaData } from "../models/userMeta.model.js";
import { encrypt, decrypt } from "../utils/crypto.js";

const authorizeEncrypt = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        const userMeta = await UserMetaData.findOne({ user_id: user._id });
        if (!userMeta) {
            return res.render("register", { error: "No metadata" });
        }
        const decryptedMsg = decrypt({
            ciphertext: user.password,
            key: userMeta.key,
            iv: userMeta.iv,
            tag: userMeta.tag,
            aad: userMeta.aad,
        });

        if (decryptedMsg === password) {
            return res.render("sketch");
        }
        return res.render("register", { error: "Wrong password" });
    } catch (e) {
        console.error("Lvl2 Auth error:", e.message);
        return res.render("register", { error: "Invalid login" });
    }
};

const registerEncrypt = async (req, res) => {
    const { email, password } = req.body;
    const metaData = encrypt(password);

    const u = new User({ email, password: metaData.ciphertext });
    const userMeta = new UserMetaData({ user_id: u._id, ...metaData });

    try {
        await u.save();
        await userMeta.save();
        res.render("login");
    } catch (e) {
        console.error("Lvl2 Register error:", e.message);
        res.render("register", { error: "User already exists" });
    }
};

export { authorizeEncrypt, registerEncrypt };
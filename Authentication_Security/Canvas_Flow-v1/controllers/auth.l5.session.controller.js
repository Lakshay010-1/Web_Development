import { User } from "../models/user.model.js";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const authorizeSession = (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    req.login(user, (err) => {
        if (err) {
            return res.redirect("/authorize");
        }
        passport.authenticate("local")(req, res, () => res.redirect("/"));
    });
};


const registerSession = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isUserExists=await User.findOne({email});
        if(isUserExists){
            return res.render("login");
        }

        // passport-local-mongoose returns a Promise if no callback is provided
        const user = await User.register(new User({ email }), password);

        // Log the user in (establishes a login session)
        await new Promise((resolve, reject) =>
            req.login(user, (err) => (err ? reject(err) : resolve()))
        );

        return res.render("login"); // exactly one response
    } catch (err) {
        console.error("Lvl5 Register error:", e.message);
        // Fallback: let your error middleware handle it, or redirect with a generic error
        // Or: return res.redirect("/authorize?error=registration_failed");
        return next(err);
    }
};


export { registerSession, authorizeSession };
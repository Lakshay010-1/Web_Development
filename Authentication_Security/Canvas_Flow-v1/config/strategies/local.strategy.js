import { User } from "../../models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";

const localStrategy = new LocalStrategy(
    { usernameField: "email" }, // Use "email" instead of "username"
    async (email, password, done) => {
        try {
            const user = await User.authenticate()(email, password);
            if (!user.user) {
                return done(null, false, { message: "Invalid email or password" });
            }
            return done(null, user.user);
        } catch (err) {
            return done(err);
        }
    }
);

export { localStrategy };
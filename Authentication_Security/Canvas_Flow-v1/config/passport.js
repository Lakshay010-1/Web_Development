import passport from "passport";
import { User } from "../models/user.model.js";
import { googleStrategy } from "./strategies/google.strategy.js";
import { localStrategy } from "./strategies/local.strategy.js";

const configurePassport = () => {

    // Session serialization
    // Mongoose automatically creates a virtual getter id which is just this._id.toString().
    // So -> user._id → the actual ObjectId object.
    //       user.id → a string representation of _id.
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user)).catch(done);
    });

    // Register strategies
    passport.use("google", googleStrategy);
    passport.use("local", localStrategy);
};

export { configurePassport };
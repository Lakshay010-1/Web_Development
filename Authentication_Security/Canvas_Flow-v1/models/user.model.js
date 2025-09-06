import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    googleId: { type: String},
    displayName: String,
    picture: String,
    password: String,
    refreshToken: String
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            displayName: this.displayName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });


const User = mongoose.model("User", userSchema);

export { User };
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";
import { encrypt, decrypt } from "./crypto.js";
import md5 from "md5";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import OAuth2Strategy from "passport-oauth2";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5555;


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(`${process.env.URI}/${process.env.DB}`);

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    googleId: { type: String, unique: true },
    displayName: String,
    picture: String,
    password: String
});

const userMetaDataSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    key: String,
    iv: String,
    tag: String,
    aad: String,
});
const UserMetaData = mongoose.model("UserMetaData", userMetaDataSchema);



// For level-5 authentication
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });


const User = mongoose.model("User", userSchema);


// For level-5 authentication
passport.use(User.createStrategy());

// Mongoose automatically creates a virtual getter id which is just this._id.toString().
// So -> user._id → the actual ObjectId object.
//       user.id → a string representation of _id.
// passport.serializeUser(User.serializeUser());
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// passport.deserializeUser(User.deserializeUser());
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});


const strategy = new OAuth2Strategy(
    {
        authorizationURL: process.env.AUTH_URI,
        tokenURL: process.env.TOKEN_URI,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        state: true,                             // CSRF protection
    },
    async (accessToken, refreshToken, params, profile, done) => {
        try {
            const { data: userinfo } = await axios.get(
                process.env.OAUTH_USERINFO_URL,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            let user = await User.findOne({ googleId: userinfo.sub });
            if (!user) {
                user = await User.create({
                    googleId: userinfo.sub,
                    displayName: userinfo.name,
                    email: userinfo.email,
                    picture: userinfo.picture, accessToken,
                    refreshToken: refreshToken || null,
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
);

strategy.authorizationParams = function () {
    return { access_type: "offline", prompt: "consent" };
}

passport.use("google", strategy);


app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        return res.render("sketch");
    }
    res.render("login");
});

app.get("/authorize", (req, res) => {
    res.render("register");
});

app.get("/logout", async (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.warn(err);
            return next(err);
        }
        res.redirect('/');
    });
});

// Authorization level-1 ( Basic Authentication ) 
app.post("/authorizeLvl1", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        if (user.password === password) {
            return res.render("sketch");
        }
        return res.render("register", { "error": "Wrong password" });
    } catch (e) {
        console.error("Auth error:", e.message);
        return res.render("register", { "error": "Wrong password or user don't exist!!!" });
    }
});
app.post("/registerLvl1", async (req, res) => {
    const { email, password } = req.body;
    const u = new User({
        email: email,
        password: password
    });
    try {
        await u.save();
    } catch (e) {
        res.render("register", { "error": "user with same email exists!!!" });
    }
    res.render("login");
});

// Authorization level-2 ( Encryption using crypto )
app.post("/authorizeLvl2", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        const userMetaData = await UserMetaData.findOne({ user_id: user._id });
        if (!userMetaData) {
            return res.render("register", { error: "No metadata for user" });
        }

        const payload = {
            ciphertext: user.password,
            key: userMetaData.key,
            iv: userMetaData.iv,
            tag: userMetaData.tag,
            aad: userMetaData.aad
        };

        const decryptedMsg = decrypt(payload);
        if (decryptedMsg === password) {
            return res.render("sketch");
        }
        return res.render("register", { "error": "Wrong password" });
    } catch (e) {
        console.error("Auth error:", e.message);
        return res.render("register", { "error": "Wrong password or user don't exist!!!" });
    }
});
app.post("/registerLvl2", async (req, res) => {
    const { email, password } = req.body;
    const metaData = encrypt(password);
    const u = new User({
        email: email,
        password: metaData.ciphertext
    });
    const userMetaD = new UserMetaData({
        user_id: u._id,
        key: metaData.key,
        iv: metaData.iv,
        tag: metaData.tag,
        aad: metaData.aad
    });
    try {
        await u.save();
        try {
            await userMetaD.save();
        } catch (e) {
            throw new Error("Error posting meta data");
        }
    } catch (e) {
        res.render("register", { "error": "user with same email exists!!!" });
    }
    res.render("login");
});

// Authorization level-3 ( Hashing using md5 )
app.post("/authorizeLvl3", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        if (user.password === md5(password)) {
            return res.render("sketch");
        }
        return res.render("register", { "error": "Wrong password" });
    } catch (e) {
        console.error("Auth error:", e.message);
        return res.render("register", { "error": "Wrong password or user don't exist!!!" });
    }
});
app.post("/registerLvl3", async (req, res) => {
    const { email, password } = req.body;
    const u = new User({
        email: email,
        password: md5(password)
    });
    try {
        await u.save();
    } catch (e) {
        res.render("register", { "error": "user with same email exists!!!" });
    }
    res.render("login");
});

// Authorization level-4 ( Hashing + Salt using bcrypt ) 
app.post("/authorizeLvl4", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.render("register", { error: "User not found" });
        }
        bcrypt.compare(password, user.password, (error, response) => {
            if (error) {
                console.warn("Error, ", error);
            }
            if (response) {
                return res.render("sketch");
            }
            return res.render("register", { "error": "Wrong password" });
        });
    } catch (e) {
        console.error("Auth error:", e.message);
        return res.render("register", { "error": "Wrong password or user don't exist!!!" });
    }
});
app.post("/registerLvl4", async (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async (error, response) => {
        if (error) {
            console.warn("Bcrypt error,", error);
            return res.render("register");
        }
        const u = new User({
            email: email,
            password: response
        });
        try {
            await u.save();
        } catch (e) {
            res.render("register", { "error": "user with same email exists!!!" });
        }
        res.render("login");
    });
});

// Authorization level-5 ( Session cookie and Hashing + Salt using express-session and passport ) 
app.post("/authorizeLvl5", async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email: email, password: password });
    req.login(user, function (err) {
        if (err) {
            console.warn("Error Authorizing user, ", err);
            return res.redirect("/authorize");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });

});
app.post("/registerLvl5", async (req, res) => {
    const { email, password } = req.body;

    User.register({ email: req.body.email }, req.body.password, function (error, user) {
        if (error) {
            console.warn("Error registering User, ", error);
            return res.redirect("/authorize");
        }
        passport.authenticate("local")(req, res, function () {
            res.render("login");
        });
    });
});

// Authorization Level-6 (O-Auth(Open Authorization))
app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["openid", "profile", "email"]
    })
);
app.get("/auth/google/canvas",
    passport.authenticate("google", { failureRedirect: "/authorize" }),
    (req, res) => {
        res.redirect("/");
    }
);


app.listen(PORT, () => {
    console.log(`Hosted on http://localhost:${PORT}`);
});
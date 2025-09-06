import OAuth2Strategy from "passport-oauth2";
import axios from "axios";
import { User } from "../../models/user.model.js";

const googleStrategy = new OAuth2Strategy(
    {
        authorizationURL: process.env.AUTH_URI,
        tokenURL: process.env.TOKEN_URI,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        state: true, // CSRF protection
    },
    async (accessToken, refreshToken, params, profile, done) => {
        try {
            const { data: userinfo } = await axios.get(process.env.OAUTH_USERINFO_URL, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            let user = await User.findOne({ googleId: userinfo.sub });
            if (!user) {
                user = await User.create({
                    googleId: userinfo.sub,
                    displayName: userinfo.name,
                    email: userinfo.email,
                    picture: userinfo.picture,
                    accessToken,
                    refreshToken: refreshToken || null,
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
);

// Extra params for offline access + consent
googleStrategy.authorizationParams = () => ({
    access_type: "offline",
    prompt: "consent",
});

export { googleStrategy };
import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { configurePassport } from "./config/passport.js";

import homeRoutes from "./routes/home.routes.js";
import lvl1Routes from "./routes/auth.l1.basic.routes.js";
import lvl2Routes from "./routes/auth.l2.encrypt.routes.js";
import lvl3Routes from "./routes/auth.l3.hash.routes.js";
import lvl4Routes from "./routes/auth.l4.salt.routes.js";
import lvl5Routes from "./routes/auth.l5.session.routes.js";
import lvl6Routes from "./routes/auth.l6.jwt.routes.js";
import oauthRoutes from "./routes/outh.google.routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
configurePassport();

// Routes
app.use(homeRoutes);
app.use(lvl1Routes);
app.use(lvl2Routes);
app.use(lvl3Routes);
app.use(lvl4Routes);
app.use(lvl5Routes);
app.use(lvl6Routes);
app.use("/auth/google",oauthRoutes);

export { app };


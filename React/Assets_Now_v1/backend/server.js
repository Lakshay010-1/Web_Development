import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import trendingAssetsRouter from "./routes/trendingAssetsRoutes.js"
import exchangeCurrencyRouter from "./routes/exchangeCurrencyRoutes.js"
import fetchRouter from "./routes/fetchRoutes.js"
import getAssetsRouter from "./routes/getAssetsRoutes.js"
import historyAssetsRouter from "./routes/historyAssetsRoutes.js"
import searchAssetsRouter from "./routes/searchAssetsRoutes.js"
import listRouter from "./routes/listRoutes.js"
import authRouter from "./routes/authRoutes.js"
import authToken from "./middlewares/authTokenMiddleware.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const router = express.Router();

const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started successfully`);
        });
    } catch (error) {
        console.error(`Server startup failed: ${error}`);
        process.exit(1);
    }
};


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URI,
    credentials: true
}));


app.get("/", (req, res) => {
    res.status(200).json({ message: "API running successfully." });
});

app.get("/me", authToken, (req, res) => {
    const { name, id, email } = req.user;
    res.status(200).json({ user: { name, id, email } });
});

router.use("/trending", trendingAssetsRouter);
router.use("/search", searchAssetsRouter);
router.use("/history", historyAssetsRouter);
router.use("/get", getAssetsRouter);
router.use("/fetch", fetchRouter);
router.use("/exchange", exchangeCurrencyRouter);
router.use("/users", authRouter);
router.use("/list/:list", listRouter);

app.use("/api", router);

startServer();
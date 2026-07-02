const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authToken = require("./middleware/authMiddleware");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");
const User = require("./models/user");

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "API Running" });
});

app.get("/me", authToken, async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json({
        user: {
            name: user.name,
            id: user._id,
            email: user.email
        }
    });
});

router.use("/users", userRoutes);
router.use("/places", placeRoutes);


app.use("/api", router);


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started successfully`)
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
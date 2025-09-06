import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";

// DB + Server
const PORT=process.env.PORT;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting database!, ", error);
    });
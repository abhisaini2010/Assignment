import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns";
import discoverRoutes from "./routes/discoverRoutes.js";
dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Coy Discover API is running"
    });
});

app.use("/api", discoverRoutes);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
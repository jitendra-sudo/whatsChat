import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import suggestionRoutes from "./src/Routes/suggestionRoutes.js";
import { setupWebSocketServer } from "./utils/wsServer.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());


const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("DB Error:", err);
    }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    ConnectDB();
});

app.use("/api", suggestionRoutes);

setupWebSocketServer(server);
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./connectDb";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", contentRoutes);

// Start server
const startServer = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

export default app;

import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";

const app = express();
app.use(express.json());
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;

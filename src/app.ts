import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import summaryRoutes from "./routes/summaryRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/auth", authRoutes);
app.use("/summary", summaryRoutes);

app.get("/", (_req, res) => {
  res.send("API de gastos funcionando");
});

export default app;

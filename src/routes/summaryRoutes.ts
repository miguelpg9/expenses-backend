import { Router } from "express";
import { getSummary, getChartSummary } from "../controllers/summaryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getSummary);
router.get("/chart", authenticateToken, getChartSummary);

export default router;

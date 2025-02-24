import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router: Router = Router();

router.post("/", handleRefreshToken);

export default router;

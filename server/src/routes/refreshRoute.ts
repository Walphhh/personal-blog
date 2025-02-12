import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router: Router = Router();

router.get("/refresh", handleRefreshToken);

export default router;

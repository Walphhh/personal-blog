import { Router } from "express";
import { handleLogout } from "../controllers/logoutController";

const router: Router = Router();

router.get("/", handleLogout);

export default router;

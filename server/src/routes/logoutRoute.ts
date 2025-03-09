import { Router } from "express";
import { handleLogout } from "../controllers/logoutController";
import { verify } from "crypto";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = Router();

router.get("/", verifyJWT.verifyRefreshToken, handleLogout);

export default router;

import { Router } from "express";
import { handleLogin } from "../controllers/authController";

const router: Router = Router();

router.post("/login", handleLogin);


export default router;

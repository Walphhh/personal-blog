import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { userController } from "../controllers/userController";

const router: Router = Router();

router.post("/login", handleLogin);
router.get("/username/:id", userController.findUsernameByID);

export default router;

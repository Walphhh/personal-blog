import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { userController } from "../controllers/userController";
import { handleLogout } from "../controllers/logoutController";

const router: Router = Router();

router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.post("/sign-up", userController.postUser);
router.get("/username/:id", userController.findUsernameByID);

export default router;

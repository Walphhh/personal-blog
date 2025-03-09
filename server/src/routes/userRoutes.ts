import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { userController } from "../controllers/userController";
import { handleLogout } from "../controllers/logoutController";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = Router();

router.post("/login", handleLogin);
router.get("/logout", verifyJWT.verifyRefreshToken, handleLogout);
router.post("/sign-up", userController.postUser);
router.get("/username/:id", userController.findUsernameByID);

export default router;

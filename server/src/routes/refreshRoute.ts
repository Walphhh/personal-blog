import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";
import verifyJWT from "../middleware/verifyJWT";
import { userController } from "../controllers/userController";

const router: Router = Router();

router.post("/", handleRefreshToken);
router.post("/user", verifyJWT.verifyRefreshToken, userController.findUser);

export default router;

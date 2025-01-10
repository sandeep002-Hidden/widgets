import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import registerUser from "../controllers/auth/registeruser.controller.js";
import loginUser from "../controllers/auth/login.controller.js";

const router = Router();

router.route("/signup").post(upload.single("ProfilePicture"), registerUser);
router.route("/login").post(loginUser);
export default router;

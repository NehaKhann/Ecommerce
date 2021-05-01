import express from "express";
const router = express.Router();
import { authUser ,userProfile,registerUser,changePassword } from "../controllers/userControllers.js";
import protect from "../middleware/authmiddleware.js"
router.route("/").post(registerUser)
router.post("/login", authUser );
router.get ("/profile",protect,userProfile);
router.put("/changePassword",protect,changePassword);

export default router;

import express from "express";
import { signup, signin, getUsers } from "../controllers/user.js";
import { validateUser, validateUserSignUp } from "../middleware/auth.js";

const router = express.Router();


router.post("/login",validateUser, signin);
router.post("/register",validateUserSignUp, signup);
router.get("/all", getUsers);
export default router;
import express from "express";
const router = express.Router();

import { signup, signin, getUsers } from "../controllers/user.js";

router.post("/login", signin);
router.post("/register", signup);
router.get("/all", getUsers);
export default router;
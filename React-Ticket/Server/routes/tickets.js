import express from "express";
import {
  addTicket,
  getTickets,
  updateTicket,
  resolveTicket,
  getTicketsByName,
} from "../controllers/tickets.js";
const router = express.Router();
import {authenticateToken} from "../middleware/auth.js";

router.get("/", authenticateToken, getTickets);
router.post("/add", authenticateToken, addTicket);
router.put("/:id", authenticateToken, updateTicket);
router.get("/resolve/:id", resolveTicket);

router.get("/search", authenticateToken, getTicketsByName);
export default router;

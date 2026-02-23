import express from "express";
import {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// Employee apply leave
router.post("/", protect, authorizeRoles("employee"), applyLeave);

// Get leaves (role-based inside controller)
router.get("/", protect, getLeaves);

// Manager approve/reject
router.put("/:id", protect, authorizeRoles("manager", "admin"), updateLeaveStatus);

export default router;
const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  toggleTaskStatus,
  getTaskStats,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router.delete("/completed/all", protect, deleteCompletedTasks);

router.put("/:id/toggle", protect, toggleTaskStatus);

router.get("/stats", protect, getTaskStats);

router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
const express = require("express");
const CardRoutes = require("../routes/cardRoutes");
const {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} = require("../controllers/taskController");
const { isAuthenticated } = require("../authentication/authentication");

const router = express.Router();

router.use(isAuthenticated); // protecting all routes

router.route("/").get(getTasks).post(createTask);
router.route("/:taskId").patch(updateTask).delete(deleteTask);
router.use("/:taskId/card", CardRoutes);
module.exports = router;

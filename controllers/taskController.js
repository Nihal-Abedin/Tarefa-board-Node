const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Task = require("../models/taskModel");
const Card = require("../models/cardModel");

exports.getTasks = catchAsync(async (req, res, next) => {
  const userTasks = await Task.find({ createdBy: req.user.id }).populate({
    path: "cards",
  });
  res.status(201).json({
    message: "success",
    totalTasks: userTasks.length,
    data: [...userTasks],
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("A Task required a name!"));
  }
  const newTask = await Task.create({
    name: req.body.name,
    createdBy: req.user.id,
  });
  res.status(201).json({
    message: "Task Created",
    data: newTask,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    message: "Task updated",
    data: task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.status(204).json({});
});

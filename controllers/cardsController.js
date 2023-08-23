const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Card = require("../models/cardModel");

exports.createCard = catchAsync(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("A card required a name!"));
  }
  req.body.taskOf = req.params.taskId;
  const newCard = await Card.create(req.body);
  res.status(201).json({
    message: "Card Created",
    data: newCard,
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndUpdate(req.params.cardId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    message: "Task updated",
    data: card,
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  await Card.findByIdAndDelete(req.params.cardId);
  res.status(204).json({});
});

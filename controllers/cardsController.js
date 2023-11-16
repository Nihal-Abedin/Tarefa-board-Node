const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Card = require("../models/cardModel");
const { json } = require("express");

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

exports.getSingleCard = catchAsync(async (req, res, next) => {
  const card = await Card.findById(req.params.cardId);

  if (!card) {
    return next(new AppError("No Card found", 400));
  }

  res.status(200).json({
    message: "success",
    status: 200,
    data: card,
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndUpdate(req.params.cardId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "Task updated",
    data: card,
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  await Card.findByIdAndDelete(req.params.cardId);
  res.status(204).json({});
});

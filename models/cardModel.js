const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A task must have name!"],
  },
  priority: {
    type: String,
    enum: ["high", "medium", "lof"],
    default: "medium",
  },
  taskOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});

const cardModel = mongoose.model("Card", cardSchema);

module.exports = cardModel;

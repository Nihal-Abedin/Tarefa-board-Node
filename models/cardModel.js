const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A task must have name!"],
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  taskOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["in progress", "done", "not started"],
    default: "not started",
  },
});

const cardModel = mongoose.model("Card", cardSchema);
// cardModel
//   .updateMany({}, { $set: { status: "not started" } }, { runValidators: false })
//   .then((result) => console.log("Documents updated:", result))
//   .catch((err) => console.error("Error updating documents:", err))
//   .finally(() => console.log("ERR"));
module.exports = cardModel;

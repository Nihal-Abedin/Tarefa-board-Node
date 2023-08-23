const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A task must have name!"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtuals

taskSchema.virtual("cards", {
  ref: "Card",
  localField: "_id",
  foreignField: "taskOf",
});
const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;

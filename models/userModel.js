const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validation = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name!"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email!"],
    unique: true,
    validate: {
      validator: function (v) {
        return validation.isEmail(v);
      },
      message: ({ value }) => `${value} is not a valid Email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password!"],
    maxLength: 8,
    minLength: 5,
  },
  confirm_password: {
    type: String,
    required: [true, "Please Provide a Password!"],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: (props) => `Passwords doesn't match!`,
    },
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// pre-document middlewares

// password hash
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined;
  next();
});

//schema methods

userSchema.methods.comparePassword = (hasedPassword, curPass) => {
  return bcrypt.compare(curPass, hasedPassword);
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('User',userSchema)

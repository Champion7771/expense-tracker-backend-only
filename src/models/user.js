const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    monthlyBudget: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

// Middleware
userSchema.pre("save", function (next) {
  if (this.monthlyBudget <= 0) {
    return next(new Error("Monthly budget must be positive"));
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

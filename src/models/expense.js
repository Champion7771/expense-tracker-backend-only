const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// Middleware
expenseSchema.pre("save", async function (next) {
  const User = mongoose.model("User");
  const userExists = await User.findById(this.user);

  if (!userExists) {
    return next(new Error("Cannot add expense for non-existing user"));
  }
  if (this.amount <= 0) {
    return next(new Error("Expense amount must be positive"));
  }

  next();
});

module.exports = mongoose.model("Expense", expenseSchema);

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true },

    amount: { 
      type: Number, 
      required: true, 
      min: 1 },

    category: {
      type: String,
      required: true,
      trim: true
},

    date: { 
      type: Date,
      required: true },
      
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// Middleware: Prevent expense for non-existing user
expenseSchema.pre("save", async function () {
  const User = mongoose.model("User");
  const exists = await User.exists({ _id: this.user });

  if (!exists) {
    throw new Error("User does not exist");
  }
});

module.exports = mongoose.model("Expense", expenseSchema);

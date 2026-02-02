const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, startDate, endDate } = req.query;

    const filter = { user: req.params.id };

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMonthlySummary = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const result = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.params.id),
          date: { $gte: start }
        }
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSpent = result[0]?.totalSpent || 0;

    res.json({
      totalExpenses: totalSpent,
      remainingBudget: user.monthlyBudget - totalSpent,
      expenseCount: result[0]?.count || 0
    });
  } catch {
    res.status(400).json({ message: "Invalid request" });
  }
};

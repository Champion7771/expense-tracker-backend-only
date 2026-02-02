const express = require("express");
const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(expenseRoutes);

app.use(errorHandler);

module.exports = app;

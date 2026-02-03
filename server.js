require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db.js");

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();

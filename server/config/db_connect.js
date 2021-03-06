const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`DB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};
module.exports = connectDB;

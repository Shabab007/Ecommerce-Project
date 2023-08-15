const mongoose = require("mongoose");

module.exports.connection = async () => {
  try {
    const url =
      "mongodb+srv://Shabab:hellorhythm.1@merng-stack-ardhu.gcp.mongodb.net/MERNG-Stack?retryWrites=true&w=majority";
    mongoose.set("debug", true);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

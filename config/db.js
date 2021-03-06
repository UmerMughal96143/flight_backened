const { Mongoose } = require('mongoose');

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected ${con.connection.host}`.cyan.underline.bold);
  } catch (err) {
    console.log(`Error ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB ;

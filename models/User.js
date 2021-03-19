const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }
    // phone: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);

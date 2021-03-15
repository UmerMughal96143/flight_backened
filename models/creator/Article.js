const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    testLocation: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    numberOfPeoples: {
      type: String,
      required: false,
    },
    postcode: {
      type: String,
      required: false,
    },
    flightTime: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: false,
    },
    peoples: [
      {
        Person: {
          type: String,
          required: false,
        },
        dob: {
          type: String,
          required: false,
        },
        email: {
          type: String,
          required: false,
        },
        firstName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: false,
        },
        mobile: {
          type: String,
          required: false,
        },
        passportIdCard: {
          type: String,
          required: false,
        },
        sex: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", FormSchema);

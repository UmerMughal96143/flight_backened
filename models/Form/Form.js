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
    address1: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    numberOfPeoples: {
      type: String,
      required: false,
    },
    postCode: {
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
    cardHolderName: {
      type: String,
      required: false,
    },
    cardNumber: {
      type: String,
      required: false,
    },
    cvv: {
      type: String,
      required: false,
    },
    expiryDate: {
      type: String,
      required: false,
    },
    appointmentDate : {
      type: String,
      required: false,
    },
    amountPaid : {
      type: String,
      required: false,
    },
    testType : {
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
        referenceId: {
          type: String,
          required: false,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Form", FormSchema);

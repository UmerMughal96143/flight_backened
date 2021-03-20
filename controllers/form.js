const Article = require("../models/creator/Article");
const Form = require("../models/creator/Article");

const flightForm = async (req, res, next) => {
  try {
    let allFormsLength = await Form.find();
    var counter = 0;
    for (i = 0; i < allFormsLength.length; i++) {
      if (allFormsLength.length > 0) {
        counter = allFormsLength[i].peoples.length + counter;
      }
    }
    let formData = {
      title: req.body.data[0].title,
      testType : req.body.data[0].testType,
      testLocation: req.body.data[1].testLocation,
      address1: req.body.data[2].address1,
      address2: req.body.data[2].address2,
      postCode: req.body.data[2].postCode,
      city: req.body.data[2].city,
      flightTime: req.body.data[3].flightTime.Hours,
      startDate: req.body.data[3].startDate,
      cardHolderName: req.body.paymentData.cardHolderName,
      cardNumber: req.body.paymentData.cardNumber,
      cvv: req.body.paymentData.cvv,
      expiryDate: req.body.paymentData.expiryDate,
      referenceId: `AH/2021 ${allFormsLength.length + 1}`,
      amountPaid : req.body.amountPaid,
      appointmentDate : req.body.appointmentDate
    };
    let savedform = await Article.create(formData);
    const counterSaver = () => {
      return counter = counter + 1
    }
    if (savedform) {
      for (var i = 0; i < req.body.peoplesData.length; i++) {
        req.body.peoplesData[i].referenceId = `AH/2021${counterSaver()}`;
        savedform.peoples.push(req.body.peoplesData[i]);
      }
    }
    console.log(counter, "counter");
    await savedform.save();
    res.status(200).json({ success: true, savedform });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const getAllForms = async (req, res, next) => {
  try {
    let forms = await Form.find();
    res.status(200).json({ success: true, forms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};







module.exports = {
  flightForm,
  getAllForms
};

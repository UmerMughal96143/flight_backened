const Form = require("../models/Form/Form");
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51IoCHMIvpnJMlGBHHLkhwIKEgAR36Qpt2g3ytBTKz6jAnfaW4WfaNR3IyeHM8OfZXewBKzrr4dmuTTg3qirzFbIF00gHF3dTTR"
);

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
      testType: req.body.data[0].testType,
      testLocation: req.body.data[1].testLocation,
      address1: req.body.data[2].address1,
      address2: req.body.data[2].address2,
      postCode: req.body.data[2].postCode,
      city: req.body.data[2].city,
      flightTime: req.body.data[3].flightTime.Hours,
      startDate: req.body.data[3].startDate,
      referenceId: `AH/2021 ${allFormsLength.length + 1}`,
      amountPaid: req.body.amountPaid,
      appointmentDate: req.body.appointmentDate,
    };
    let savedform = await Form.create(formData);
    const counterSaver = () => {
      return (counter = counter + 1);
    };
    if (savedform) {
      for (var i = 0; i < req.body.peoplesData.length; i++) {
        req.body.peoplesData[i].referenceId = `AH/2021${counterSaver()}`;
        savedform.peoples.push(req.body.peoplesData[i]);
      }
    }
    await savedform.save();

    res.status(200).json({ success: true, savedform });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllForms = async (req, res, next) => {
  try {
    let forms = await Form.find({ testLocation: req.query.id });
    res.status(200).json({ success: true, forms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getSingleForm = async (req, res, next) => {
  try {
    let forms = await Form.findOne({
      peoples: { $elemMatch: { referenceId: req.query.id } },
    });
    res.status(200).json({ success: true, forms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const changeStatusOfApplication = async (req, res, next) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({ status: false, msg: "Query not Exist" });
    }
    let forms = await Form.findOneAndUpdate(
      { "peoples.referenceId": req.query.id },
      { $set: { "peoples.$.status": true } }
    );

    res.status(200).json({ success: true, forms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const stripePayment = async (req, res, next) => {
  try {
    const { id, totalPrice } = req.body;
    const response = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "GBP",
      description: "MyFlightPass",
      payment_method: id,
      confirm: true,
    });
    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const atechyPayment = async (req, res, next) => {
  try {
    const { id, reference_id } = req.body;
    const response = await stripe.paymentIntents.create({
      amount: 150 * 100,
      currency: "GBP",
      description: `Atechy Health payment ref ID : ( ${reference_id} ) `,
      payment_method: id,
      metadata: {
        order_id: `${reference_id}`,
      },
      confirm: true,
    });
    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  flightForm,
  getAllForms,
  getSingleForm,
  changeStatusOfApplication,
  stripePayment,
  atechyPayment,
};

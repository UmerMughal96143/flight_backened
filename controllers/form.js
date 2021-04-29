const Form = require("../models/Form/Form");
var QRCode = require("qrcode");
var parser = require("fast-xml-parser");
var axios = require('axios')
var he = require('he')



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
      cardHolderName: req.body.paymentData.cardHolderName,
      cardNumber: req.body.paymentData.cardNumber,
      cvv: req.body.paymentData.cvv,
      expiryDate: req.body.paymentData.expiryDate,
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
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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"
    );

    for (var i = 0; i < req.body.peoplesData.length; i++) {
      let img = await QRCode.toDataURL(
        "data invoice untuk di kirim melalui email"
      );
      console.log("🚀 ~ file: form.js ~ line 51 ~ flightForm ~ img", img);
      let address =
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
      const msg = {
        to: req.body.peoplesData[i].email,
        from: "hamzabadshah888@gmail.com", // Use the email address or domain you verified above
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: ` html: 'Mail From Flight </br> <img src="${img}" />`,
      };

      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
    }
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


const emerchantPayApi = async (req, res, next) => {
console.log("🚀 ~ file: form.js ~ line 124 ~ emerchantPayApi ~ req", req.body)
  try {

    const config = {
      headers: { "Content-Type": "text/xml" },
    };

    let xmlData = `<wpf_payment>
    <transaction_id>${Math.floor(Math.random() * 1000000000000)}</transaction_id>
    <usage>usage</usage>
    <notification_url>http://example.com/genesis.php</notification_url>
    <return_success_url>https://www.myflightpass.io/paymentsuccess</return_success_url>
    <return_failure_url>https://www.myflightpass.io/paymentfail</return_failure_url>
    <return_cancel_url>https://www.myflightpass.io/paymentdetails</return_cancel_url>
    <amount>${req.body.amountPaid}</amount>
    <currency>GBP</currency>
    <customer_email>${req.body.peoplesData[0].email}</customer_email>
    <customer_phone>${req.body.peoplesData[0].mobile}</customer_phone>
    <billing_address>
    <address1>14 HIGH ROAD</address1>
    <zip_code>RM6 6PR</zip_code>
    <city>LONDON</city>
    <state/>
    <country>GB</country>
    </billing_address>
    <transaction_types>
    <transaction_type name="authorize3d"/>
    </transaction_types>
   </wpf_payment>`;

   
    let result = await axios.post("https://staging.wpf.emerchantpay.net/en/wpf", xmlData, {
      headers: {
        "Content-Type": "text/xml",
      },
      auth: {
        username: "afec0aff1e20c8950568e32771412e9757640721",
        password: "c23d19d0180b179d2d6d6509d1e8c0c03778902d",
      },
    });

    var options = {
      attributeNamePrefix: "@_",
      attrNodeName: "attr", //default is 'false'
      textNodeName: "#text",
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
      tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ["parse-me-as-string"],
    };

    var jsonObj = parser.parse(result.data, options, true);
    res.status(200).json({ success: true, payment : jsonObj.wpf_payment });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
module.exports = {
  flightForm,
  getAllForms,
  getSingleForm,
  changeStatusOfApplication,
  emerchantPayApi
};

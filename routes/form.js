const express = require("express");
const router = express.Router();
const {
  flightForm,
  getAllForms,
  getSingleForm,
  changeStatusOfApplication,
  stripePayment,
  atechyPayment
} = require("../controllers/form");

router.post("/form", flightForm);
router.get("/form", getAllForms);
router.get("/get/form", getSingleForm);
router.post("/form/status", changeStatusOfApplication);
router.post("/pay", stripePayment);
router.post("/atechypay", atechyPayment);

module.exports = router;

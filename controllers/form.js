const Article = require('../models/creator/Article');
const Form = require('../models/creator/Article')






const flightForm = async (req, res, next) => {
    try {
     console.log(req.body.data)
     let formData = {
      title : req.body.data[0].title,
      testLocation : req.body.data[1].testLocation,
      address : req.body.data[2].address,
      postcode : req.body.data[2].postcode,
      flightTime : req.body.data[3].flightTime.Hours,
      startDate : req.body.data[3].startDate,
     }
     let savedform = await Article.create(formData)
     if(savedform){
       for(var i = 0 ; i < req.body.peoplesData.length ; i++){
         savedform.peoples.push(req.body.peoplesData[i])
        }
        
      }
      console.log("🚀 ~ file: form.js ~ line 24 ~ flightForm ~ savedform", savedform)
      await savedform.save()
      res.status(200).json({ success: true, msg: "Send link to your email",savedform });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };



  module.exports = {
    flightForm,
  };
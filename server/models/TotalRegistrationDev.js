const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    RegistrationNo:{
        type:String
     },
     year:{
        type:String
     },
     month: {
         type: String 
     },
     status: {
         type: String 
     },
     Course: {
        
         type: String 

     }       
});

const uploads = new mongoose.model("totalregistrationdevnos", userSchema);


module.exports = uploads;
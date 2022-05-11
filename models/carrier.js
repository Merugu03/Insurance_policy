const mongoose=require("mongoose")

const carrierSchema=new mongoose.Schema({
  company_name:{
    type: String,
    required: [true, 'Please provide carrier name'],
    maxlength: [50, 'carrier name can not be more than 30 characters'],
    unique: true 
  }
})

module.exports=mongoose.model('Carrier',carrierSchema)
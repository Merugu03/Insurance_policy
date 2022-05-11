const mongoose=require("mongoose")
const agent = require("./agent")

const userAccountSchema=new mongoose.Schema({
  Account_Name:{
    type: String,
    required: [true, 'Please provide Account Name'],
    maxlength: [100, 'Account Name can not be more than 50 characters'],
    unique: true 
  }
})

module.exports=mongoose.model('userAccount',userAccountSchema)
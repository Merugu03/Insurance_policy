const mongoose=require("mongoose")

const LOBSchema=new mongoose.Schema({
  category_name:{
    type: String,
    required: [true, 'Please provide LOB'],
    maxlength: [30, 'LOB can not be more than 30 characters'],
    unique: true 
  }
})

module.exports=mongoose.model('LOB',LOBSchema)
const mongoose=require("mongoose")

const AgentSchema=new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please provide agent name'],
    maxlength: [20, 'Name can not be more than 100 characters'],
    unique: true 
  }
})

module.exports=mongoose.model('Agent',AgentSchema)
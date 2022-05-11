const mongoose=require("mongoose")

const policySchema=new mongoose.Schema({
  policy_number:{
    type: String,
    required: [true, 'Please provide LOB'],
    maxlength: [30, 'LOB can not be more than 30 characters'],
    unique: true 
  },
  policy_start_date:{
    type: Date,
    required: [true, 'Please provide Start Date'],
  },
  policy_end_date:{
    type:Date,
    required: [true, 'Please provide Policy end date'],
  },
  policy_category_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide Policy category id'],
    ref: 'LOB'
  },
  company_name_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide company id'],
    ref: 'Carrier'
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide User id'],
    ref: 'User'
  }
})

module.exports=mongoose.model("policy",policySchema)
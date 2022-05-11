const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
  firstname:{
    type: String,
    required: [true, 'Please provide first name'],
    maxlength: [50, 'firstname can not be more than 30 characters'],
    default : null
  },
  dob: {
    type: Date,
    required: [true, 'Please provide Date of birth'],
    default : null
  },
  address:{
    type: String,
    maxlength: [100, 'address can not be more than 100 characters'],
    default : null
  },
  phone:{
    type: Number,
    required: true,
    default : 000
  },
  state:{
    type: String,
    maxlength: [5, 'State code can not be more than 5 char '],
    default : null
  },
  zip:{
    type: String,
    default : null
  },
  email:{
    type: String,
    required: [true, 'Please provide email Id'],
    maxlength: [30, 'email  can not be more than 30 char '],
    default : null
  },
  userType:{
    type: String,
    default: "Active Client",
    default : null
  }
})

module.exports=mongoose.model('User',UserSchema)
const { StatusCodes } = require('http-status-codes');

const Policy=require("../models/policy")
const LOB=require("../models/LOB")
const Carrier=require("../models/carrier")
const User=require("../models/user");
const carrier = require('../models/carrier');

const ObjectId = require('mongodb').ObjectID;


const getAllpolices=async(req,res)=>{
  try {
    const policy= await Policy.find({})
    res.status(StatusCodes.OK).send({"count":policy.length})
    
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const getPolicy=async(req,res)=>{
  try {
    console.log(req.query.policy_number)
    const policy= await Policy.find({policy_number:req.query.policy_number})
    if(policy.length==0){
      res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the policy  ${req.query.policy_number}`})
    }else{
      res.status(StatusCodes.OK).send(policy)
    }
   
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const createPolicy=async (req,res)=>{

  const LOB_p=await LOB.findOne({category_name:req.body.policy_category})
  const User_p= await User.findOne({firstname:req.body.user})
  const carrier_p=await Carrier.findOne({company_name:req.body.company_name})

  console.log(LOB_p["_id"],)
  console.log(User_p["_id"])
  console.log(carrier_p["_id"])

  const policy= await Policy.create({
    policy_number: req.body.policy_number,
    policy_start_date: new Date(req.body.policy_start_date),
    policy_end_date: new Date(req.body.policy_end_date),
    policy_category_id: LOB_p["_id"],
    company_name_id: carrier_p["_id"],
    user_id: User_p["_id"]
  })

  res.status(StatusCodes.OK).send(policy)

}

const deletePolicy=async(req,res)=>{

  try {
    const policy=await Policy.findOne({policy_number:req.query.policy_number})
    if(!policy){
      res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the policy Number ${req.query.policy_number}`})
    }
    else{
      const removed=await policy.remove()
      res.status(StatusCodes.OK).json({ msg: 'Success! policy removed.',removed });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const updatePolicy=async(req,res)=>{
  try {
    //console.log(req.body,req.query.name)
    if(req.body.policy_end_date){
      req.body.policy_end_date=new Date(req.body.policy_end_date)
    }
    if(req.body.policy_start_date){
      req.body.policy_start_date=new Date(req.body.policy_start_date)
    }
    if(req.body.policy_category_name){
      req.body.policy_category_id=await LOB.findOne({category_name:req.body.policy_category_name}).select("_id")
    }
    if(req.body.company_name){
      req.body.company_name_id=await carrier.findOne({company_name:req.body.company_name}).select("_id")
    }
    if(req.body.user){

      req.body.user_id=await User.findOne({firstname:req.body.user}).select("_id")
    }
  const policy= await Policy.findOneAndUpdate({policy_number:req.body.policy_number},req.body)
  res.status(StatusCodes.OK).send(policy)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

module.exports={getPolicy,getAllpolices,createPolicy,deletePolicy,updatePolicy}
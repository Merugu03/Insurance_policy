const user=require("../models/user")
const { StatusCodes } = require('http-status-codes');

const test=(req,res)=>{
  console.log(req.params)
  console.log(req.query.name)
  console.log(req.body)
  res.send("Hello")
}

const getUser=async (req,res)=>{
  try {
    console.log(req.query.name)
    const User= await user.find({firstname:req.query.name})
    if(User.length==0){
      res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the user with name ${req.query.name}`})
    }else{
      res.status(StatusCodes.OK).send(User)
    }
   
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const getAlluser=async (req,res)=>{
  try {
    const users= await user.find({})
    res.status(StatusCodes.OK).send({"count":users.length})
    
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const updateUser=async (req,res)=>{
  try {
    //console.log(req.body,req.query.name)
    if(req.body.dob){
      req.body.dob=new Date(req.body.dob)
    }
  const User= await user.findOneAndUpdate({firstname:req.query.name},req.body)
  res.status(StatusCodes.OK).send(User)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const createUser=async (req,res)=>{
  try {
    req.body.dob=new Date(req.body.dob)
    const User= await user.create(req.body)
    res.status(StatusCodes.OK).send(User)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const deleteUser=async (req,res)=>{
  try {
    const User=await user.findOne(req.body)
    if(!User){
      res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the User with name ${req.body.firstname}`})
    }
    else{
      const removed=await User.remove()
      res.status(StatusCodes.OK).json({ msg: 'Success! user removed.',removed });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

module.exports={test,getAlluser,getUser,updateUser,createUser,deleteUser}
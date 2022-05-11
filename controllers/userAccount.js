const UserAccount=require("../models/userAccount")
const { StatusCodes } = require('http-status-codes');

const createUA=async(req,res)=>{
  const name=req.query.name
  try {
    const userA=await UserAccount.create({Account_Name:name})
    res.status(StatusCodes.CREATED).json(userA)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
}

const getAllUA = async (req, res) => {
  try{
    const userA = await UserAccount.find({});

    res.status(StatusCodes.OK).json({ userA, count: userA.length });
  }
  catch(error){ 
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  
};

const getSingelUA = async (req, res) => {
  const name= req.query.name;

  const userA = await UserAccount.findOne({Account_Name: name} )

  if (!userA) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the LOB with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ userA });
  }
  
};

const updateUA = async (req, res) => {
  const name= req.query.name;
  const newName= req.query.Nname

  const userA = await UserAccount.findOneAndUpdate({ Account_Name: name },{Account_Name:newName}, {
    new: true,
    runValidators: true,
  });

  if (!userA) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ userA });
  }
  
};

const deleteUA= async (req, res) => {
  const name = req.query.name;

  const userA = await UserAccount.findOne({ Account_Name:name });

  if (!userA) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }
  else{
    const removed=await userA.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! agent removed.',removed });
  }

  
};

module.exports={createUA,getAllUA,getSingelUA,updateUA, deleteUA}
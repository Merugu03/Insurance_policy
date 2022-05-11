const LOB=require("../models/LOB")
const { StatusCodes } = require('http-status-codes');

const createLOB=async(req,res)=>{
  const name=req.query.name
  try {
    const lob=await LOB.create({category_name:name})
    res.status(StatusCodes.CREATED).json(lob)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  //console.log(req.query.name)
}

const getAllLOB = async (req, res) => {
  try{
    const lob = await LOB.find({});

    res.status(StatusCodes.OK).json({ lob, count: lob.length });
  }
  catch(error){ 
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  
};

const getSingelLOB = async (req, res) => {
  const name= req.query.name;

  const lob = await LOB.findOne({category_name: name} )

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the LOB with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ lob });
  }
  
};

const updateLOB = async (req, res) => {
  const name= req.query.name;
  const newName= req.query.Nname

  const lob = await LOB.findOneAndUpdate({ category_name: name },{category_name:newName}, {
    new: true,
    runValidators: true,
  });

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ lob });
  }
  
};

const deleteLOB = async (req, res) => {
  const name = req.query.name;

  const lob = await LOB.findOne({ category_name:name });

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }
  else{
    const removed=await lob.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! agent removed.',removed });
  }

  
};

module.exports={createLOB,getAllLOB,getSingelLOB,updateLOB, deleteLOB}
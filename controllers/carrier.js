const Carrier=require("../models/carrier")
const { StatusCodes } = require('http-status-codes');

const createCarrier=async(req,res)=>{
  const name=req.query.name
  try {
    const lob=await Carrier.create({company_name:name})
    res.status(StatusCodes.CREATED).json(lob)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  //console.log(req.query.name)
}

const getAllCarriers = async (req, res) => {
  try{
    const lob = await Carrier.find({});

    res.status(StatusCodes.OK).json({ lob, count: lob.length });
  }
  catch(error){ 
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  
};

const getSingelCarrier = async (req, res) => {
  const name= req.query.name;

  const lob = await Carrier.findOne({category_name: name} )

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the LOB with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ lob });
  }
  
};

const updateCarrier= async (req, res) => {
  const name= req.query.name;
  const newName= req.query.Nname

  const lob = await Carrier.findOneAndUpdate({ category_name: name },{category_name:newName}, {
    new: true,
    runValidators: true,
  });

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ lob });
  }
  
};

const deleteCarrier = async (req, res) => {
  const name = req.query.name;

  const lob = await Carrier.findOne({ category_name:name });

  if (!lob) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }
  else{
    const removed=await lob.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! agent removed.',removed });
  }

  
};

module.exports={createCarrier,getAllCarriers,getSingelCarrier,updateCarrier, deleteCarrier}
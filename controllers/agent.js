const Agent=require("../models/agent")
const { StatusCodes } = require('http-status-codes');

const createAgent=async(req,res)=>{
  const name=req.query.name
  try {
    const agent=await Agent.create({name})
    res.status(StatusCodes.CREATED).json(agent)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  //console.log(req.query.name)
}

const getAllagents = async (req, res) => {
  try{
    const agents = await Agent.find({});

    res.status(StatusCodes.OK).json({ agents, count: agents.length });
  }
  catch(error){ 
    res.status(StatusCodes.BAD_REQUEST).send(error.message)
  }
  
};

const getSingelAgent = async (req, res) => {
  const name= req.query.name;

  const agent = await Agent.findOne({ name })

  if (!agent) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ agent });
  }
  
};

const updateAgent = async (req, res) => {
  const name= req.query.name;
  const newName= req.query.Nname

  const agent = await Agent.findOneAndUpdate({ name: name },{name:newName}, {
    new: true,
    runValidators: true,
  });

  if (!agent) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }else{
    res.status(StatusCodes.OK).json({ agent });
  }
  
};

const deleteAgent = async (req, res) => {
  const name = req.query.name;

  const agent = await Agent.findOne({ name:name });

  if (!agent) {
    res.status(StatusCodes.BAD_REQUEST).json({message:`Did not find the agent with name ${name}`})
  }
  else{
    const removed=await agent.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! agent removed.',removed });
  }

  
};

module.exports={createAgent,getAllagents,getSingelAgent,updateAgent, deleteAgent}
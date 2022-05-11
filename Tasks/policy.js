const csvtojson=require("csvtojson")
const user=require("../models/user")
const LOB=require("../models/LOB")
const policy=require("../models/policy")
const carrier=require("../models/carrier")

var ObjectId = require('mongodb').ObjectID;

const filename=`${__dirname}/sample.csv`

const policy_uploadCsv=async (req,res)=>{
  try{
  const array=[]
  const LOB_p=await LOB.find({})

  const user_p=await user.find({})
  const carrier_p= await carrier.find({})

  const lobData={}
  const userData={}
  const carrierData={}
  for(let a of LOB_p){
  let {_id,category_name}= a
  lobData[category_name]=_id
  }
  for(let a of user_p){
    let {_id,firstname}= a
    userData[firstname]=_id
  }
  for(let a of carrier_p){
    let {_id,company_name}= a
    carrierData[company_name]=_id
  }
  
  
  csvtojson().fromFile(filename).then(source=>{
    for(let i=0;i<source.length;i++){
  
      array.push({"policy_number":source[i]["policy_number"],"policy_start_date":new Date(source[i]["policy_start_date"]),"policy_end_date":new Date(source[i]["policy_end_date"]),
      "policy_category_id":lobData[source[i]["category_name"]],
      "company_name_id": carrierData[source[i]["company_name"]],
      "user_id": userData[source[i]["firstname"]]
    })
  }
  try {
    const policys=  policy.insertMany(array)
    policys.then((value,err)=>{
      if(err){
        res.status(400).send({error:err.message})
      }
      else{
        res.status(200).send(value)
      }
    })
  } catch (error) {
    res.status(400).send({error:error.message})
  }
  })
}catch(err){
  res.status(400).send({error:err.message})
}
}

module.exports=policy_uploadCsv



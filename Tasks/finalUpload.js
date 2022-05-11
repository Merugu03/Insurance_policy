const csvtojson=require("csvtojson")
const Agent=require("../models/agent")
const LOB=require("../models/LOB")
const Carrier=require("../models/carrier")
const User = require("../models/user")
const userA=require("../models/userAccount")

const filename=`${__dirname}/sample.csv`

const final_uploadCsv= async (req,res,next)=>{
  const LOBset= new Set()
  const agentSet=new Set()
  const carrierSet=new Set()
  const userAset=new Set()
  const arrayAgent=[]
  const arrayLOB=[]
  const arrayCarrier=[]
  const arrayUser=[]
  const arrayUserA=[]

  csvtojson().fromFile(filename).then(source=>{
   
    for(let i=0;i<source.length;i++){

      agentSet.add(source[i]["agent"])
      carrierSet.add(source[i]["company_name"])
      LOBset.add(source[i]["category_name"])
      userAset.add(source[i]["account_name"])


      arrayUser.push({"firstname":source[i]["firstname"],"dob":new Date(source[i]["dob"]),"address":source[i]["address"],
      "phone":isNaN(source[i]["phone"])? 0:Number(source[i]["phone"]),"zip":source[i]["zip"],"state":source[i]["state"],"userType":source[i]["userType"],
      "email": source[i]["email"]})


    }
    for(let n of agentSet){
      arrayAgent.push({"name":n})
    }

    for(let n of carrierSet){
      arrayCarrier.push({"company_name":n})
    }

    for(let n of LOBset){
      arrayLOB.push({"category_name":n})
    }

    for(let n of userAset){
      arrayUserA.push({"Account_Name":n})
    }
    
    const agents= Agent.insertMany(arrayAgent)
    const lobs= LOB.insertMany(arrayLOB)
    const carrier=  Carrier.insertMany(arrayCarrier)
    const user=  User.insertMany(arrayUser)
    const User_a= userA.insertMany(arrayUserA)

  
    Promise.allSettled([lobs,carrier,user]).then((value)=>{
      next()
    }).catch((err)=>{
      res.send(err.message)
    })

  })
  
}

module.exports=final_uploadCsv


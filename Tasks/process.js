
const getUpload=(req,res)=>{
  console.log("Hello")
  res.sendFile("../public/index.html")
}

const postCSV= (req,res,next)=>{
  const file = req.files.file;
    file.mv(__dirname + "/sample.csv", function (err, result){
    if(err){
      res.send("Error")
    }else{
    next()
    return
    }
   
  })
    
}

module.exports={getUpload,postCSV}

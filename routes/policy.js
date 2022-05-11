const express = require("express");
const router = express.Router();
const {getAllpolices,getPolicy,createPolicy,deletePolicy,updatePolicy}=require("../controllers/policy")

router.route("/").get(getPolicy).post(createPolicy).delete(deletePolicy).patch(updatePolicy)
router.route("/getAll").get(getAllpolices)

module.exports=router
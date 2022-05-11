const express = require("express");
const router = express.Router();
const {test,getAlluser,getUser,updateUser,createUser,deleteUser}=require("../controllers/user")

router.route("/").get(getUser).post(createUser).patch(updateUser).delete(deleteUser)
router.route("/getAllusrs").get(getAlluser)

module.exports=router
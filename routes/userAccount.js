const express = require("express");
const router = express.Router();
const {createUA,getAllUA,getSingelUA,updateUA, deleteUA}=require("../controllers/userAccount")

router.route("/").get(getSingelUA).patch(updateUA).post(createUA).delete(deleteUA)
router.route("/getAllUA").get(getAllUA)

module.exports=router
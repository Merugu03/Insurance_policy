const express = require("express");
const router = express.Router();
const {getUpload,postCSV}= require("../Tasks/process");
const policy=require("../Tasks/policy")
const final_uploadCsv=require("../Tasks/finalUpload")

router.route("/").get(getUpload);
router.route("/csv/upload").post(postCSV,final_uploadCsv,policy);//,policy)


module.exports = router;
const express = require("express");
const router = express.Router();

const {createLOB,getAllLOB,getSingelLOB,updateLOB, deleteLOB}=require("../controllers/LOB")

router.route("/").get(getSingelLOB).patch(updateLOB).post(createLOB).delete(deleteLOB)
router.route("/getAllLOB").get(getAllLOB)

module.exports=router
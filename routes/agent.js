const express = require("express");
const router = express.Router();
const {createAgent,getAllagents,getSingelAgent,updateAgent,deleteAgent}=require("../controllers/agent")


router.route("/").get(getSingelAgent).patch(updateAgent).post(createAgent).delete(deleteAgent)
router.route("/getAllagents").get(getAllagents)


module.exports=router
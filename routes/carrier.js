const express = require("express");
const router = express.Router();
const {createCarrier,getAllCarriers,getSingelCarrier,updateCarrier, deleteCarrier}=require("../controllers/carrier")

router.route("/").get(getSingelCarrier).patch(updateCarrier).post(createCarrier).delete(deleteCarrier)
router.route("/getAllcarriers").get(getAllCarriers)


module.exports=router
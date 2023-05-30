const express=require("express");
const {getAccountUrl,verifyAccount}=require("../controllers/stripe.controller")

const router=express.Router();

router.route("/").get(getAccountUrl);
router.route("/verify-account").get(verifyAccount)


module.exports=router;
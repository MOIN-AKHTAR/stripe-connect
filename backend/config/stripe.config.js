const Stripe=require("stripe");

exports.stripeClient=new Stripe(process.env.STRIPE_SK,{
    apiVersion: null,
  })
require("dotenv").config({
    path:".env"
})
const express=require("express");
const cors=require("cors");

const app=express();

app.use(cors({
    origin:"*",
    methods:"*"
}));

app.use("/stripe",require("./routes/stripe.route"));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})


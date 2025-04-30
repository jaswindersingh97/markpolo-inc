const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

app.get("/helloworld", (req,res)=>{
    return res.send({message:"HelloWorld"});
});

const endpoints = require("./endpoints/users");
app.use("/api/users",endpoints);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on port:`,port);
});
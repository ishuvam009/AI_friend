import express from "express";

const app = express();

app.get("/",(req,res)=>{
    const query = req.body.query;
    const token = req.body.token;
});

app.listen(3000, ()=>{
    console.log(`App is running at PORT 3000.`);
})
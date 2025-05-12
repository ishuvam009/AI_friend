import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello from server");
});

app.listen(3000, ()=>{
    console.log(`App is running at PORT 3000.`);
})
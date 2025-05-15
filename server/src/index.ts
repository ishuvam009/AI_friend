import express from "express";
import userRouter from "./router/user";


const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/user', userRouter);

app.get("/",(req,res)=>{
    const query = req.body.query;
    const token = req.body.token;
});

app.listen(3000, ()=>{
    console.log(`App is running at PORT ${PORT}`);
})
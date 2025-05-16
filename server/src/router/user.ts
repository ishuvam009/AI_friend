import { Router,Response,Request } from "express";

const userRouter = Router();

userRouter.post('/chat',(req: Request, res: Response)=>{
    res.send('Hello ');
})

export default userRouter;
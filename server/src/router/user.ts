import { Router,Response,Request } from "express";

const userRouter = Router();

userRouter.post('/chat',(req: Request, res: Response)=>{
    const query = req.body.query;
    const context = req.body.context;
    const systemPrompt = req.body.systemPrompt;
    const hasPaid = req.body.hasPaid;
    
    if(!query && !context && !systemPrompt && !hasPaid){
        res.status(406).json({message:''})
    }
})

export default userRouter;
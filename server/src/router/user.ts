import { Router,Response,Request } from "express";

const userRouter = Router();

userRouter.post('/chat',(req: Request, res: Response)=>{
    const query = req.body.query;
    const context = req.body.context;
    const systemPrompt = req.body.systemPrompt; //should be stores not should asked every time.
    const hasPaid = req.body.hasPaid;
    
    if(!query && !context && !hasPaid){
        res.status(406).json({message:''})
    }

    //(query + context) + system prompt 
})

export default userRouter;
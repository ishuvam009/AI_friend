import axios from "axios";
import { Router,Response,Request } from "express";

const userRouter = Router();

const GEMINI_API_KEY = '';

const geminiApiCall = async(query: string, context: string, systemPrompt: string)=> {
    const model = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
        system_instruction: {
            parts: [
                {
                    text: systemPrompt
                }
            ]
        },
        contents: [
            {
                parts: [
                    {
                        text: query
                    }
                ]
            }
        ]
    };

    const headers = {
        'Content-Type':'application/josn'
    };

    const response = await axios.post(url, requestBody, {headers});
    return response.data;
};


userRouter.post('/chat',async (req: Request, res: Response)=>{
    try {
        const query = req.body.query;
        const context = req.body.context;
        const systemPrompt = req.body.systemPrompt; //should be stores not should asked every time.
        const hasPaid = req.body.hasPaid;
        
        if(!query && !context && !hasPaid){
            res.status(406).json({message:'Error in context'});
        }

        const response = await geminiApiCall(query,context,systemPrompt);
        res.status(200).json(response);

        //(query + context) + system prompt 
    } catch (error) {
        console.log(error,('Error.'));
    }

});

export default userRouter;
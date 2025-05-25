import { Router, Request, Response } from 'express';
import axios from 'axios';

const userRouter = Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Gemini API call function
async function geminiApiCall(query: string, context: string, systemPrompt: string) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        system_instruction: {
          parts: [
            {
              text: systemPrompt,
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: `${context}\n${query}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch from Gemini API');
  }
}

// Route
userRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { query, context = '', systemPrompt, hasPaid } = req.body;

    if (!query || !systemPrompt || hasPaid !== true) {
       res.status(406).json({ message: 'Invalid input or user not authorized' });
    }

    const response = await geminiApiCall(query, context, systemPrompt);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

export default userRouter;

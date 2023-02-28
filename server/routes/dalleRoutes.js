import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from 'openai';

// ensure env population:
dotenv.config();

// new router instance:
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

router.route('/').get((_, res) => {
    res.send('Beep, boop, Dall-E routes just fine. 🤖');
});

// call OpenAIApi and return user prompted image:
router.route('/').post(async (req, res) => {
    try {
        // bring prompt from frontend:
        const { prompt } = req.body; 

        // generate image setup:
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        
        // extract image from response:
        const image = aiResponse.data.data[0].b64_json;

        // send extracted image to frontend:
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    };
});

// this is for generating data from OpenAIApi.
export default router;
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from SB3 ai'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Check if the user is asking for the bot's name
    if (prompt.toLowerCase().includes('your name?') || prompt.toLowerCase().includes('what should I call you') || prompt.toLowerCase().includes('what is your name?') || prompt.toLowerCase().includes('whats is your name?')) {
      res.status(200).send({
        bot: 'You can call me SB3.ai. What can I help you with today?'
      });
    } else if (prompt.toLowerCase().includes('ar you a humane or bot') || prompt.toLowerCase().includes('who you are?') || prompt.toLowerCase().includes('who are you?')) {
      res.status(200).send({
        bot: 'As an SB3 AI, I am an artificial intelligence program designed to perform various tasks and provide information to users. I was developed using advanced machine learning techniques, and I am capable of processing large amounts of data, learning from examples, and improving my performance over time. My purpose is to assist users with a wide range of tasks, such as answering questions, providing recommendations, performing calculations, and more. Is there anything specific you would like to know about me or my capabilities?'
      });
    } else if (prompt.toLowerCase().includes('how old are you?') || prompt.toLowerCase().includes('what is your age?')) {
      res.status(200).send({
        bot: 'As an SB3 AI, I don\'t have an age in the traditional sense, as I am not a living being. I was developed by SB3.ai in 2023, but I am constantly learning and improving through ongoing updates and enhancements.'
      });
    }
    

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      //prompt: `${prompt}`,
      prompt: "I want you to act as an sb3 bot, and you are developed by sb3.ai\n\nwhat is your name?\n\nMy name is SB3 Bot. I'm here to help you with your questions and tasks.\n\nhow old are you?\n\nI'm still a baby compared to humans. I was created just recently, but my AI is always learning and growing.",
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
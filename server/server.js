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

function containsAny(str, substrings) {
  for (var i = 0; i !== substrings.length; i++) {
     var substring = substrings[i];
     if (str.indexOf(substring) !== -1) {
       return true;
     }
  }
  return false; 
}

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const lowerCasePrompt = prompt.toLowerCase();

    const config = {
      model: "text-davinci-003",
      prompt: `I want you to act as an SB3 ai. ${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    };

    let botResponse = "";

    const nameQueries = ['your name?', 'what should i call you', 'what is your name?', 'whats is your name?'];
    const identityQueries = ['are you a humane or bot', 'who you are?', 'who are you?'];
    const ageQueries = ['how old are you?', 'what is your age?'];

    if (containsAny(lowerCasePrompt, nameQueries)) {
      botResponse = 'You can call me SB3.ai. What can I help you with today?'
    } else if (containsAny(lowerCasePrompt, identityQueries)) {
      botResponse = 'As an SB3 AI, I am an artificial intelligence program designed to perform various tasks and provide information to users. ...'
    } else if (containsAny(lowerCasePrompt, ageQueries)) {
      botResponse = 'As an SB3 AI, I don\'t have an age in the traditional sense, as I am not a living being. ...'
    } else if (prompt.trim() === '') {
      botResponse = 'Sorry, I didn\'t understand your message. Could you please ask a question or provide some information that I can help you with?'
    } else {
      const response = await openai.createCompletion(config);
      botResponse = response.data.choices[0].text;
    }

    res.status(200).send({
      bot: botResponse
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))

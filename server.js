const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/', async (req, res) => {
  try {
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: req.body.message }],
        model: 'gpt-3.5-turbo',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    console.log(completion.data.choices[0]);
    res.status(200).json(completion.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/test', async (req, res) => {
  const { apiKey, prompt, tool } = req.body;

  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) return res.status(400).json({ error: 'No API key provided' });

  try {
    const result = await axios.post(
      'http://localhost:8000/testAgent', // np. endpoint FastAPI
      {
        question: prompt || 'test',
        tool,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
      }
    );
    res.json({ output: result.data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

module.exports = router;

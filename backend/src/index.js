const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CORVUS backend is running!');
});

app.listen(3001, () => {
  console.log('🚀 Backend running on http://localhost:3001');
});

const openAiRoute = require('./routes/openai.route');
app.use('/api/openai', openAiRoute);

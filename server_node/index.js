const express = require('express');
const cors = require("cors");
const { translate } = require('./models/api');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/translate', async (req, res) => {
  const textENG = req.body["text"];

  const textPTBR = await translate(textENG);

  // Retorna o mesmo formato do provedor (array de objetos) para o front consumir via resp.json()
  res.json(textPTBR);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongooseConnect from './services/mongoose';

import { PORT } from './config';

const app = express();
mongooseConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/status', async (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json(new Error(error));
  }
});

app.listen(PORT, () => {
  console.log(`Node Server is up at http://localhost:${PORT} port`);
})

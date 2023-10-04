import express, { Request, Response } from 'express';
import axios from 'axios';
import { body, validationResult } from 'express-validator'
import { tracesController, validationsTraces } from './controllers/traces.controller';

require('dotenv').config();
const app = express();

app.use(express.json());

app.post('/traces', validationsTraces, tracesController);

app.get('/statistics', (req: Request, res: Response) => {
  // Fetch data from your storage. For this example, we are returning dummy data.
  res.json({
      'longest_distance': {
          'country': 'United States',
          'value': 0
      },
      'most_traced': {
          'country': 'United States',
          'value': 1
      }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
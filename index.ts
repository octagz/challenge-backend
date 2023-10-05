import express, { Request, Response } from 'express';
import axios from 'axios';
import { body, validationResult } from 'express-validator'
import { tracesController, validationsTraces } from './controllers/traces.controller';
import { statsController } from './controllers/statistics.controller';

require('dotenv').config();
const app = express();

app.use(express.json());

app.post('/traces', validationsTraces, tracesController);

app.get('/statistics', statsController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
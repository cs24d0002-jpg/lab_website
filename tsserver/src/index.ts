import express from 'express';
import cors from 'cors';
import apiRouter from './api'; // Automatically imports src/api/index.ts
import { cryptoMiddleware } from './middlewares/cryptoMiddleware';


const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(cryptoMiddleware);
app.use('/', apiRouter);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Connected to Node TypeScript backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
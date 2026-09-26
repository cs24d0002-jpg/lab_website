import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public';
import aiRoutes from './routes/ai';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/api/public', publicRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Connected to Node TypeScript backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
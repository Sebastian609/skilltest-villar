import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import charactersRoutes from './routes/characters.routes';
import { errorHandler } from './middleware/error.handler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', charactersRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

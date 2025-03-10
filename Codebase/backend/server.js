import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRouter from './routes/notes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend access
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or authentication headers 
}));


app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Protected notes routes
app.use('/api/notes', authMiddleware, notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
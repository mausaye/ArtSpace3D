import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

// middleware to parse json (from req.body)
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', (req, res) => {
    res.send('API is running');
});

/* mount the available API routes */
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`));


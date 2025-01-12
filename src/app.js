import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from '~/config/db';
import { APIs_V1 } from '~/routes/v1';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', APIs_V1);

// Errors handler
app.use(errorHandlerMiddleware);

export default app;

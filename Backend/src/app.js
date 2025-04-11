import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {connectDB} from './database/db.js';
import cookieParser from 'cookie-parser'; 

import instituteRoutes from './routes/InstituteRoute.js';
 const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/institute', instituteRoutes);

export default app;
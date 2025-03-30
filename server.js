import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'



const app = express();
dotenv.config();



app.use(cors({
  origin:  '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
      await mongoose.connect(`${process.env.MONGO}/lms`);
      console.log('✅ Connected to MongoDB');
  } catch (error) {
      console.error('❌ MongoDB Connection Error:', error);
      throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected");
});


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager App!');
});


// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connect();
    console.log(`🚀 Server running on port ${PORT}`);
});
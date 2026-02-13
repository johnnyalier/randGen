import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import registerGameSocket from './sockets/gameSocket.js';
import userRouter from './routes/userRoutes.js'

dotenv.config()
const app = express();
// const socketServer = io(server);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 9999;

const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

registerGameSocket(server);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to randomgenerator database')
})


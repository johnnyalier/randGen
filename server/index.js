import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import registerGameSocket from './sockets/gameSocket.js';

const app = express();
// const socketServer = io(server);

app.use(cors());
app.use(express.json());

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    registerGameSocket(io, socket);
});

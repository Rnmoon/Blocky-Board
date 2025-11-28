import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for simplicity in this demo
        methods: ['GET', 'POST'],
    },
});

type Point = { x: number; y: number };
type DrawLineProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
    width: number;
};

// In-memory storage for drawing history
let drawingHistory: DrawLineProps[] = [];

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send existing history to the new client
    socket.emit('client-ready', drawingHistory);

    socket.on('draw-line', ({ prevPoint, currentPoint, color, width }: DrawLineProps) => {
        // Store the line in history
        drawingHistory.push({ prevPoint, currentPoint, color, width });

        // Broadcast to other clients
        socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color, width });
    });

    socket.on('cursor-move', ({ x, y, userId }) => {
        socket.broadcast.emit('cursor-move', { x, y, userId });
    });

    socket.on('draw-stamp', ({ x, y, stamp }) => {
        // We could store stamps in history too if we wanted persistence
        // For now, just broadcast
        socket.broadcast.emit('draw-stamp', { x, y, stamp });
    });

    socket.on('clear', () => {
        drawingHistory = [];
        io.emit('clear');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

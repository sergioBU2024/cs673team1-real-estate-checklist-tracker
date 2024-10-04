import express from 'express';
import { postRoutes } from './routes/postRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

mongoose.connect('mongodb+srv://sergiok:Password123@cluster0.x8kh0.mongodb.net', { dbName: 'demo_db' }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000, 'localhost', () => {
        console.log('listening on port 4000');
    });
}).catch(err => {
    console.log(err);
});


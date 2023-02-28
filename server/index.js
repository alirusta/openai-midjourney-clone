import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// unlike react, node needs the ".js":
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// pull env variables from dotenv:
dotenv.config();

// initialize express app:
const app = express();

// add middlewares:
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// add api endpoints that are hookable from frontend-side:
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// add root route:
app.get('/', async (req, res) => {
    res.send('Hey, this shit works. 🐱‍🚀');
});

// add localhost & connect to mongo:
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(6969, () => console.log('Server has started on port http://localhost:6969, nice²'));
    } catch (error) {
        console.log(error);
    };
}; 

// run server:
startServer();
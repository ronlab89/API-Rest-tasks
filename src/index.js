import 'dotenv/config';
import express from "express";
import './database/connectdb.js';
import authRouter from './routes/auth.route.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Server Working!</h1>`);
});

app.use('/api/v1', authRouter);

app.listen(port, () => console.log('🚀 Server listen on port: http://localhost:5000')); 
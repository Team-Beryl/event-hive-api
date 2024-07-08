import express from 'express'
import { dbConnection } from './config/db.js';



const app = express();

dbConnection();

app.use(express.json());


const PORT = 1000;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})
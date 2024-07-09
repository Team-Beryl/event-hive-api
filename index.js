import express from 'express'
import { dbConnection } from './config/db.js';
import { eventRouter } from './routes/event_route.js';
import { collegeRouter } from './routes/college_route.js';




const app = express();

dbConnection();

app.use(express.json());
app.use(eventRouter)
app.use(collegeRouter);



const PORT = 1000;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})
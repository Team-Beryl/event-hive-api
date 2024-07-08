import express from 'express'



const app = express();

app.use(express.json());


const PORT = 1000;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})
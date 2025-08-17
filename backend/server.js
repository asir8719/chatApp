import express from "express";
import { createServer } from 'http';
import { router } from "./routes/router.js";
import cors from 'cors'

const app = express();
const server = createServer(app);
app.use(cors())

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

server.listen(3000, () => {
    console.log(`Example app listening at port ${3000}`);    
});
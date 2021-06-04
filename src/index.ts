import * as express from 'express';
import {Request, Response} from 'express';
const app = express();
const port = 3000;
import { initialState } from './initialState.js';
app.get('/', (req: Request,res: Response)=>{
    res.send('Hello TypeScript');
});

app.get('/api/v1', (req: Request, res: Response)=>{
    res.json(initialState);
});

app.listen(port, ()=>{
    console.log(`Server listen at http://localhost:${port}`);
});
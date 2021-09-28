import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import {configLogs} from './config/configLoggers.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routers/userRoutes.js'
import assetRoutes from './routers/assetRoutes.js'

dotenv.config({path: './.env'});

const app = express();

app.use(cors())

const __dirname = path.resolve()
app.use('/public', express.static(path.join(__dirname, '/public')))

connectDB();

configLogs(app);

// for parsing application/xwww-form-urlencoded// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/',(req,res) => {
	res.send('GeeksforGeeks');
})


app.use(userRoutes)
app.use(assetRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT,() => {
	console.log(`Running on PORT ${process.env.PORT}`);
})

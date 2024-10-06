import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"]
}
app.use(cors(corsOptions));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('FoodBook app is running..')
})

app.use(globalErrorHandler);

app.use(notFound);

export default app;
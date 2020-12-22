import express from 'express'
import morgan from "morgan";
import videoRoutes from "./routes/videos.routes";
import cors from "cors";


const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(videoRoutes)

export default app;


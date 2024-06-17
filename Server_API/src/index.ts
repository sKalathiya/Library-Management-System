import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose, { mongo } from 'mongoose';
import router from '../router';

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const server = http.createServer(app);

server.listen(8080, () => {
    console.log("server is running on localhost 8080.");
});

const MONGO_URL = "mongodb+srv://Sahil:Sahil%402000@cluster0.gjloj7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise  = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/images", express.static("uploads"));
app.use("/",router());
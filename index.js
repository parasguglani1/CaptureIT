import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

//Importing Routes
import postRoutes from './Routes/posts.js';
import userRoutes from './Routes/users.js';


//Creating app function with express module
const app = express();


//Specifying the HTML POST request handler to bind data with req.body and mentioning limit size and nested object true
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Using Routes as middleware
app.use('/posts',postRoutes);
app.use('/user',userRoutes);


//Connnect server application with Real Database mongoDb Atlas

const CONNECTION_URL = "mongodb+srv://paras:Paras1008@memories.cvmmsu6.mongodb.net/?retryWrites=true&w=majority";

//Specifying port to run using environment variables in .env file
const PORT = process.env.PORT || 5000;

//Connnecting mongoDB atlas with the application using Promises.
mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(PORT, () => { console.log(`Server Started on Port ${PORT}`) }) })
    .catch((error) => { console.log(error.message) });




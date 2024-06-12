import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());


app.use(bodyParser.json({limit:"30mb",extended:true}));


// urlencoded is a method used to parse incoming request bodies with URL-encoded data, which is usually 
// from HTML form submissions. When you use bodyParser.urlencoded(), you're telling Express to use this middleware 
// to parse the data coming from forms in your application.

app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


app.use('/posts',postRoutes);
app.use('/user' ,userRoutes);

app.get('/',(req,res)=>{
    res.send('APP IS RUNNING. ');
})

// console.log(process.env.CONNECTION_URL)

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> app.listen(PORT,()=> console.log(`server running on port:${PORT}`))).catch((error)=> console.log(`The error is ${error.message}`));


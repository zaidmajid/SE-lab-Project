import express from'express';
import colors from 'colors';
import dotenv from'dotenv';
import morgan from "morgan"
import cors from "cors";
//require('./config/db')
import connectToMongo from './config/db.js';
import authRoutes from './routes/authRoute.js'

//configure env
dotenv.config();

//database config 
connectToMongo();

const app=express()

//middlewares

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/auth", authRoutes);

//rest apis
app.get('/',(req,res)=>{
    res.send({
        message:("<h1>Welcome to Petrolium</h1>"),
    });
});
//PORT
const PORT = process.env.PORT || 8080 ;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`.bgCyan.white);
      
});
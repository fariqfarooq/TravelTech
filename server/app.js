import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'




const app = express();

app.use(morgan('dev'));
app.use(express.json({limit:"30mb" ,extended:true}));
app.use(express.urlencoded({limit:"30mb" ,extended:true}));
app.use(cors());

app.use('/users' , userRouter);   // http://localhopst:3030/users/signup
app.use('/tour',tourRouter)

const MONGODB_URL='mongodb://127.0.0.1:27017/tourApp'

const PORT = 3030;
app.get('/',(req,res)=>{
    res.send('hello');
});

mongoose
.connect(MONGODB_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
    console.log('mongoose connected successfully');
})
.catch((err)=>{
    console.log(`${err} database not connected successfully`);
})
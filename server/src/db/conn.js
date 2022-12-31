const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(`${process.env.CONNECTION_URL}`).then(()=> console.log('connection successfull...')).catch((err)=> console.log("mongoose connection error "+err));
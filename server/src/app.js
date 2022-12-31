const express= require('express');
const bodyParser= require('body-parser');
require('./db/conn');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

dotenv.config();

const port=process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(require('./routers/router'));
app.use(require('./routers/auth'));


app.listen(port,()=>{
    console.log(`server is running at the port ${port}`);
})
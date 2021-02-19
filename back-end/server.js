const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.set('useCreateIndex', true);
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',function(){
    console.log('MongoDB database connection establish succesfully');
})

const userRouter = require('./router/user');

app.use('/users',userRouter);

app.listen(port, function(){
    console.log(`Sever is runing in port: ${port}`);
})
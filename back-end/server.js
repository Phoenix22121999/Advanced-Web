const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '785675406531-6jj2vfqpm5m06803lo5sph9ifdlgtsf6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

// app.post('/login', (req, res) => {
//     let token = req.body.token;
//     async function verify() {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//         });
//         const payload = ticket.getPayload();
//         const userid = payload['sub'];
//         // res.cookie('session-token', token);
//         res.json({ code: 1, data: payload });
//     }
//     verify()
//         .catch(console.error);

// })



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./router/user');
app.use('/api', usersRouter);

app.listen(port, function () {
    console.log(`Sever is runing in port: http://localhost:${port}`);
})
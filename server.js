const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');

require('./config/passport')(passport);

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);


// Use CORS middleware
app.use(cors({
  origin: 'https://googleoauth2.netlify.app', // Allow this origin to access the server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// app.use(session({
//   secret: '8ecd454161b19fd966d83cf0249143a84482671bf7c16cf612cdf2be6247a6c8',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
// }));

app.use(session({
  secret: '8ecd454161b19fd966d83cf0249143a84482671bf7c16cf612cdf2be6247a6c8', // Use the secret from .env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));

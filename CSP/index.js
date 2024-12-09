const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./user');
const app = express();

app.use(cors());  // Allow all origins by default, configure as needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/user', userRoute);

module.exports = app;

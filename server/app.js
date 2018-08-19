const express = require("express");
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors'); // It prevents cross-origin request errors.
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://root:12345@localhost:27017/medium";

// Cloudinary Details
cloudinary.config({
    cloud_name: 'dg1dqbdmq',
    api_key: '553515999923195',
    api_secret: '6OCEzWaQYlbKUztf4dK73oinmMo'
});

// Connect to MongoDB URL
mongoose.Promise = global.Promise;
mongoose.connect(url, { auth: { authdb: "admin" }, useNewUrlParser: true }).catch(function (err) {
    console.log(err);
});


routes(router);

// Setup Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

// Start server
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.Promise = global.Promise;
const port = process.env.Port || 3000;


mongoose.connect('mongodb://localhost/' + process.env.DB_NAME)
    .then(() => {
        console.log('succesfully connected with DB');
    }).catch((err) => {
        console.log("error with DB");
        console.log(err);
    });

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use(require('./routes/route'));
// app.use('/',(req,res) => {
    
//     res.render('home');

// });
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})
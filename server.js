require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//MongoDB connections
mongoose.connect('mongodb://localhost:27017/Chat-App', 
{ useNewUrlParser: true,
    useCreateIndex: true, })

//Start Server
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(PORT);
console.log("Server started at: " +  PORT);

//User Routes
const userRoutes = require('./api/routes/UserRoute');
app.use("/users", userRoutes);

//error checkings
app.use((req, res, next)=>{
    console.log("No route executed");
    const error = new Error("Not Found");
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
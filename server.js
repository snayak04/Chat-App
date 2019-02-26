require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;


//Start Server
app.listen(PORT);
console.log("Server started at: " +  PORT);

//User Routes
const userRoutes = require('./api/routes/UsersRoute');
app.use("/users", userRoutes);
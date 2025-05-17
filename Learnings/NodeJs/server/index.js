const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Home Page');
});

app.get('/about', (req, res) => {  
    const username = req.query.myname;
    res.send("Hi " + username + "\nWelcome to About Page");
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

// Handling Urls in  node js
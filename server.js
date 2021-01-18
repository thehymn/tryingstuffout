const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/addrecipe', (req, res) => {
    res.sendFile(__dirname + '/client/addrecipe.html');
});











app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})
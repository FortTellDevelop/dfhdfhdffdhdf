const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();

app.use('/Public', express.static(__dirname + '/Public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Views/HomePage.html');
});

app.get('/docs', function(req, res) {
    res.sendFile(__dirname + '/Views/DocsPage.html');
});

app.get('/api/aes', function(req, res) {
    axios.get('https://fnbot.shop/api/aes')
    .then(response => {
        res.json(response.data);
    });
});

app.get("/api/news/brnews", (req, res) => {
        res.json(BRNews)
});

app.get('/api/news/stw', function(req, res) {
    axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game')
    .then(response => {
        res.json(response.data.savetheworldnews.news.messages);
    });
});

app.get('/api/news/crv', function(req, res) {
    axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game')
    .then(response => {
        res.json(response.data.creativenews.news.messages);
    });
});

app.get('/api/paks', function(req, res) {
    axios.get('https://benbotfn.tk/api/v1/status')
    .then(response => {
        res.json(response.data);
    });

});

app.get('/api/fnstatus', function(req, res) {
    axios.get('https://lightswitch-public-service-prod06.ol.epicgames.com/lightswitch/api/service/bulk/status?serviceId=Fortnite')
    .then(response => {
        res.json(response.data);
    })
});

app.listen(5000, function() {
    console.log('API Is Online On Port: 5000');
});
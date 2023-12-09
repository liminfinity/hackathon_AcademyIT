const fs = require('fs');
const path = require('path');
const express = require('express');
const { request } = require('http');

const app = express();

const port = 3000;

app.use('/css', express.static(path.resolve('public/css')));

app.use('/html', express.static(path.resolve('public/html')));

app.use('/js', express.static(path.resolve('public/js')));

app.use('/assets', express.static(path.resolve('public/images')));

app.use(express.json());

app.get('/', (_, res) => {
    res.redirect('/autorization');
})
app.get('/autorization', (_, res) => {
    res.sendFile(path.resolve('public/html/autorization.html'));
})
app.post('/autorization', (request, response) => {
    console.log(request.body.blob_img)
    
})
app.get('/registration', (_, res) => {
    res.sendFile(path.resolve('public/html/registration.html'));
})
app.get('/main', (_, res) => {
    res.sendFile(path.resolve('public/html/main.html'));
})
app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту`)
})


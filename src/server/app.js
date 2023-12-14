const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
const formParser = require('body-parser')

const app = express();
let user_data;

const port = 3000;

app.use('/css', express.static(path.resolve('public/css')));

app.use('/html', express.static(path.resolve('public/html')));

app.use('/js', express.static(path.resolve('public/js')));

app.use('/assets', express.static(path.resolve('public/images')));

app.use(express.json({limit: '50mb'}))

app.get('/', (_, res) => {
    res.redirect('/autorization');
})
app.get('/autorization', (_, res) => {
    res.sendFile(path.resolve('public/html/autorization.html'));
})
app.get('/account/data', (_, res) => {
    res.send(user_data);
})
app.get('/account', (_, res) => {
    res.sendFile(path.resolve('public/html/account.html'));
})
app.post('/autorization', async (request, response) => {
    let data = request.body;
    
    let form_data = new FormData();
    for (let field in data) {
        form_data.append(field, data[field])
    }
    let result
    try {
        result = await axios.post('http://192.168.0.127:5000/check_person', form_data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        user_data = result.data;
        console.log(user_data)
        response.send(result.data)
    } catch(e) {
        response.send(JSON.stringify({message: 'Лицо не распознано или отсутствует в базе'}))
    }
    
})
app.get('/registration', (_, res) => {
    res.sendFile(path.resolve('public/html/registration.html'));
})
app.post('/registration', async (request, response) => {
    let data = request.body;
    let form_data = new FormData();
    for (let field in data) {
        form_data.append(field, data[field])
    }
    let result;
    try {
        result = await axios.post('http://192.168.0.127:5000/add_user', form_data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        response.send(result.data)
    } catch(e) {
        response.send(JSON.stringify({message: 'Лицо не распознано или отсутствует в базе'}))
    }
    
})
app.get('/main', (_, res) => {
    res.sendFile(path.resolve('public/html/main.html'));
})
app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту`)
})


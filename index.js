const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appontmentService = require('./services/AppointmentService');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agenda",{useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cadastro', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    var status = await appontmentService.Create(
        req.body.name,
        req.body.description,
        req.body.email,
        req.body.date,
        req.body.time
    )
    if(status){
        res.redirect("/");
    }else{
        res.send("Falha");
    }
});

app.get('/getcalendar', async (req, res) => {
    var consulta = await appontmentService.GetAll(false);
    res.json(consulta);
});

app.get('/event/:id', async (req, res) => {
    var appointment = await appontmentService.GetById(req.params.id);
    res.render('event',{appo:appointment});
});

app.post('/finish', async (req, res) => {
    var id = req.body.id;
    var result = await appontmentService.FinishedId(id);
    res.redirect('/');
});

app.get('/list', async (req, res) => {
    var appos = await appontmentService.GetAll(true);
    res.render('list', {appos});
});
app.listen(3056, () =>{});
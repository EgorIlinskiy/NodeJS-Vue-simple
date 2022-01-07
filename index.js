import express from 'express'
import path from 'path'
import colors from 'colors'
import serverRouter from './routes/server.js'
import bodyParser from 'body-parser'


const __dirname = path.resolve()
const PORT = 3000
const server = express()

server.set('view engine', 'ejs');
server.set('views', path.resolve(__dirname, 'ejs'));

server.use(express.static(path.resolve(__dirname, 'public')))
server.use(bodyParser.urlencoded({ extended: false })) //мидлвейр для работы с телом json
server.use(bodyParser.json()); //мидлвейр для работы с телом json


server.use(serverRouter) //мидлваре который умеет делать некие промежуточные пребобразования

server.get('/', (req, res) => {
    res.render('index', { title: 'Main page', active: 'main' })

});

server.get('/clients', (req, res) => {
    res.render('page', { title: 'Clients page', active: 'clients' })

});

server.get('/test', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    console.log(req.query);
    res.send(`<h1> Твой айди ${id} и зовут тебя ${name}</h1>`)
})
server.listen(PORT, () => {
    console.log(colors.bgBlack.green(`Server is starting at ${PORT} port...`))
})

const MongoClient  = require('mongodb')
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);

// Подключаемся к серверу
mongoClient.connect(function(err, client) {

    // обращаемся к базе данных admin
    const db = client.db("admin");

    db.command({ ping: 1 }, function(err, result) {
        if (!err) {
            console.log("Подключение с сервером успешно установлено");
            console.log(result);
        }
        // Закрываем подключение
        client.close();
        console.log("Подключение закрыто");
    });
});
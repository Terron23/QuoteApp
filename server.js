const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
var db;


MongoClient.connect('mongodb://terron23:kobesmalls23@ds151433.mlab.com:51433/etlt', (err, database) => {
    db = database
 app.listen(3000, () => {
  console.log('listening on 3000')
})
})
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//Where Middleware Goes

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  
})

app.post('/quotes', (req, res) => {
    db.collection("quotes").save(req.body, (err, result) =>{
         if (err) return console.log(err)
console.log(req.body)
    console.log('saved to database')
    res.redirect('/quotes')
    })
  
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
  console.log(cursor)
})

//You use toArray to be able to do shit with the data you get from the database
app.get('/quotes', (req, res) => {
    console.log("We lit")
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

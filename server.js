const express = require('express')
const app = express()
const mongoose = require('mongoose')
const env = require('dotenv')
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movieRouter');
const port = process.env.PORT || 3000

env.config()
app.listen(port , ()=>{console.log("Listening port 3000")})
app.set("view engine","ejs")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/movies', movieRouter);

app.get("/", (req,res) => {
    console.log("get /")
    res.render("index")
})

app.get("/health", (req,res) => {
    console.log("health check")
    res.sendStatus(200)
})







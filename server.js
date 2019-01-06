const express = require('express')
const mongoose = require('mongoose')
const db = require("./config/keys").mongoURI;
const app = express();
const bodyParser = require('body-parser')
const users = require('./api/users');
const passport = require('passport')

console.log('db',db);

mongoose.connect(db).then(()=>{
    console.log('mongodb connected!!!');
}).catch(() => {
    console.log('err');
})

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api/users",users);
app.use(passport.initialize());

require("./config/passport")(passport)

app.get("/",(req, res)  => {
    res.send('hello world');
})

app.listen(port,() => {
    console.log(`server running on port ${port}`);
})


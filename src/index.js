const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


const route = require('./routes/route.js')

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/<Akash_kumar_sah_Db?retryWrites=true&w=majority", { useNewUrlParser: true }).then(()=> console.log('mongodb running on 27017')).catch(err => console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


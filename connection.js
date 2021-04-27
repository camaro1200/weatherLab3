const mongoose = require('mongoose')

//connect with db

mongoose.connect('mongodb://localhost/test',  { useNewUrlParser: true })

// mongoose.connection.once('open', function (){
//     console.log('connection has been made');
// }).on('error', function (error){
//     console.log('error is', error)
// })
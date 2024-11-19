// Const REQUIRE 
const express = require('express')
const app = express()
const {join} = require('node:path')
const users = require('./routes/users')


//public folder
app.use(express.static(join(__dirname, 'public')))

//expres config
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//API Users
app.use('/api/users', users)

//server running
app.listen('5000', (req, res)=>{
    console.log('Server open')
})
require('dotenv').config({})
const express = require('express')
const app = express();
app.use(express.json())
const jwt = require('jsonwebtoken')
const users = require('./users.json')
app.use(express.json());
const passport = require('passport')
app.use(passport.initialize());
require('./config/passport')


app.use('/user', passport.authenticate('jwt', {session:false}), require('./controller/user/index'));

app.post('/login', (req, res)=>{
    let request = req.body, payload;
    let response = {code:"OK", body:{}};
    try{
        let userExist = users.find(item=>item.username == request.username);
        if(!userExist){
            throw `could not find user ${request.username}`
        }
        if(request.password != userExist.password){
            throw `Incorrect password`
        }
        payload = {
            username:userExist.username,
            email:userExist.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        response.body = 'Bearer ' + token;
        res.status(200).send(response)
    }catch(error){
        return res.status(400).send({ "error": error.message ? error.message : error });
    }
})


module.exports = app;


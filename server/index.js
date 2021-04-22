//import all necessary dependencies
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//parsing all of the req.body
const bodyParser = require('body-parser');
//parse all the cookies 
const cookieParser = require('cookie-parser');
//create & maintain sessions b/c express creates stateless HTTP server, so by using session, we could store/keep user's Logged in information when he opens a new tab or refreshes new page
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//initialize all middlewares
const app = express();
app.use(express.json());
app.use(cors({
    //frontend URL
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"], 
    //allowing the cookie to be enabled
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//initialize the sessions
app.use(session({
    //name of the cookie that we are going to create
    key: "userId",
    secret: "candyjellylove",
    resave: false,
    saveUninitialized: false,
    cookie: {
        //expires in 24 hours
        expires: 60 * 60 * 24
    }
}))

//connecting to a database
const db = mysql.createConnection ({
    user: "root",
    host: "localhost",
    password: "1",
    database: "loginsystem",
});



app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password);


    let sql = "SELECT * FROM users where username=?";
    db.query(sql,[username], function(err,result){
        if (err) throw err;
        if (result.length > 0) {
            console.log("username already exists!")
            res.send("username already exists!")
        } else {
            bcrypt.hash(password,saltRounds,(err,hash) => {
                if (err) {
                    console.log(err);
                }
                else {
                    db.query(
                        "INSERT INTO users (username,password) VALUES (?,?)",
                        [username, hash], 
                        (err,result) => {
                        console.log(err);
                    });
                }
            })
        }
     
    })
})

app.get('/login', (req,res)=> {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    }else {
        res.send({loggedIn: false});
    }
})

app.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        username, 
        (err,result) => {
            if (err) {
                res.send({err: err})
            } 
            if (result.length > 0) {
                //since result is an array, we want to grab the first element => result[0] = user row
                bcrypt.compare(password, result[0].password, (error,response)=> {
                    if (response) {
                        //this is how you create a session => req.session.sessionName
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send ({message: "Wrong username/password combination!"})
                    }
                })
            } 
            
            else {
                res.send ({message: "User doesn't exist"})
            }
    });
})

app.get('/',(req,res)=> {
    res.send("working fine!");
})

const port = 3001
app.listen(port, (req,res)=> {
    console.log(`running server on ${port}!`);
});
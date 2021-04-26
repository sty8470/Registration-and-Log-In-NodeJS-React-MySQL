//import all necessary dependencies
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

//grabbing every single database table from models
const db = require('./models');
const User = db.users;
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


app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    //console.log(username,password);

    //check if the username is in database already
    User.findOne({ where: { username: username }})
        .then((userExists)=> {
            if(userExists) {
                return res.send(`The username "${username}" is already registered. Try to sign in with a different account`);
            }
            //if not hash the password
            let hashedPassword = bcrypt.hashSync(password,saltRounds);
            //insert into the databsae
            User.create({
                username: username,
                password: hashedPassword
            })
            .then((response)=> {
                console.log("successfully logged in", username);
                return res.send(`The username "${username}" is registered successfully`);
            })
            //if not, return the databse insertion error
            .catch((err)=> {
                return res.send("There was a database error. Please check for further information")
            });  
        });  
    });

// app.get('/login', (req,res)=> {
//     if (req.session.user) {
//         res.send({loggedIn: true, user: req.session.user});
//     }else {
//         res.send({loggedIn: false});
//     }
// })

// app.post('/login',(req,res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     db.query(
//         "SELECT * FROM users WHERE username = ?",
//         username, 
//         (err,result) => {
//             if (err) {
//                 res.send({err: err})
//             } 
//             if (result.length > 0) {
//                 //since result is an array, we want to grab the first element => result[0] = user row
//                 bcrypt.compare(password, result[0].password, (error,response)=> {
//                     if (response) {
//                         //this is how you create a session => req.session.sessionName
//                         req.session.user = result;
//                         console.log(req.session.user);
//                         res.send(result);
//                     } else {
//                         res.send ({message: "Wrong username/password combination!"})
//                     }
//                 })
//             } 
            
//             else {
//                 res.send ({message: "User doesn't exist"})
//             }
//     });
// })

app.get('/',(req,res)=> {
    res.send("working fine!");
})

//User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
//User.sync({ force: true }) - This creates the table, dropping it first if it already existed
db.sequelize.sync().then(req=> {
    const port = 3001
    app.listen(port, (req,res)=> {
        console.log(`running server on ${port}!`);
    });
})

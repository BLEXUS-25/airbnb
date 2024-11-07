const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const Session = require("express-session");
const flash = require("connect-flash");



let sessionOptions = {
    secret: "Krishna",
    resave: false,
    saveUninitialized: true
};

app.use(Session(sessionOptions));
app.use(flash());

app.get("/",(req,res) => {
    res.send("Welcome Home");
});

app.get("/register",(req,res) => {
    req.flash("success","successfully registered");
    res.send("Registered");
});



app.listen("8080"); 
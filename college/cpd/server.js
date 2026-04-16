const express = require("express");
const dbConnect = require("./db/db")
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const User = require("./model/userSchema");
const methodOverride = require('method-override')
const ejsmate = require("ejs-mate")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");


const ejs = require("ejs");
const app = express();

dbConnect();

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly:true,
    maxAge:60*60*1000
  }
}));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'))

app.engine('ejs', ejsmate)
app.set("view engine", "ejs");
app.set("views", "views");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.use(passport.authenticate("session"));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.currUser = req.user;
    next();
})

app.use(productRoute);
app.use(userRoute);


app.listen(4000, ()=>{
    console.log("server is running at port 4000");
})
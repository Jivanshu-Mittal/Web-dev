const express = require("express");
const User = require("../model/userSchema");
const passport = require("passport");
const router = express.Router();

router.get("/register", (req, res)=>{
    res.render("users/register.ejs")
})

router.post("/signup", async(req, res)=>{
    const {username, email, password, usertype} = req.body;

    const user = new User({username, email, usertype});

    await User.register(user, password);

    res.redirect("/login");
})

router.get("/login", (req, res)=>{
    res.render("users/login.ejs")
})

router.post('/signIn', passport.authenticate('local', { failureRedirect: '/login' }) ,(req, res)=> {
      console.log(req.user);
       res.redirect('/products');
});

router.post("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/login")
    })
})



module.exports = router;
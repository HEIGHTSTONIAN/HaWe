
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

    //Logging in
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        console.log("hopefully logging in");
        res.json('/app');
    });

    //Getting User Sign Up info to Database
    app.post("/api/register", function (req, res) {

        console.log("signing up");

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        req.checkBody('username', 'Name is required').notEmpty();
        req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
        req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
        req.checkBody('passwordMatch', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            console.log(errors);
            res.redirect('/login');
        } else {
            db.User.create({
                username: username,
                email: email,
                password: password
            }).then(function (dbUser) {
                console.log("User Created.");
                res.redirect('/login');
            });

        }

    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });


    // Route to get username/other data
    app.get("/app", function(req, res){
        
        if (req.user) {

            db.User.findAll({
                where: {
                    id: req.user
                }
            }).then(function(data) {
                console.log(data[0].username);
                res.render("app", {username: data[0].username});
            });
          }
        
    });


};
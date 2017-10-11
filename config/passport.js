var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    db.User.findOne({where: { username: username }}).then((user) => {
      console.log(user);
      // if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  console.log("deserialize");
  done(null, user.id);
});

passport.deserializeUser(function(obj, cb) {

  cb(null, obj);

});

// Exporting our configured passport
module.exports = passport;
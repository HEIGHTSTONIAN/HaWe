var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    
    // Makes User Model
    var User = sequelize.define("User", {
      username: { 
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false},
      email: { 
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false},
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
  

<<<<<<< HEAD:models/user.js
    // Associate with Tasks
    User.associate = function(models) {
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Todo, {
        onDelete: "cascade"
      });
    };

=======
  User.associate = function(models){
    User.hasMany(models.Todo);
  };
>>>>>>> 1ab2b01be5d453324a40641747998e7608667806:models/usersignup.js
    return User;
  };
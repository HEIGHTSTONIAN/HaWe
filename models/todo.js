module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: {
      type: DataTypes.STRING,

      allowNull: false,
      
      validate: {
        len: [1, 140]
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      
      defaultValue: false
    },

   });
    
   Todo.associate = function(models){
     Todo.belongsTo(models.User, {
      allowNull: true     
     }); // closes belong to
   }  
  
  return Todo;
};
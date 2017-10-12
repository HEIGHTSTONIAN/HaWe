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
    deadline: {
      type: DataTypes.DATE,
    }
   });


   Todo.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Todo;
};
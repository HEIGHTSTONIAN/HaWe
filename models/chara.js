module.exports = function(sequelize, DataTypes) {
    var Chara = sequelize.define("Chara", {
      body: {
        type: DataTypes.STRING,
        defaultValue: 'body1',
        allowNull: false,
      },
      eyes: {
        type: DataTypes.STRING,
        defaultValue: 'eyes1',
        allowNull: false,
      }, 
      mouth: {
        type: DataTypes.STRING,
        defaultValue: 'mouth2',
        allowNull: false,
      },
      hair: {
        type: DataTypes.STRING,
        defaultValue: 'hair1',
        allowNull: false,
      },
      clothes: {
        type: DataTypes.STRING,
        defaultValue: 'clothes1',
        allowNull: false,
      }
     });
  
  
     Chara.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Chara.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    
    return Chara;
  };
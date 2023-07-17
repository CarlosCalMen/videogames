const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        notEmpty:{
          msg:'Name could not be empty,'
        }
      },
    },
    description:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:'Description could not be empty'
        },
      }
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate:{
        hasAtLeastOnePlatform(value){
          if (!value.length)
            throw new Error ('You must indicate at leats one plataform for the game')
        }
      }
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      valdate:{
        isUrl:{
          args:true,
          msg:'Image must be a valid URL string',
        }
      }
    },
    releaseDate:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        isValidDate(value) {
          if (!(value instanceof Date))
            throw new Error('Release date must be a valid date');
        }
      }
    },
    rating:{
      type:DataTypes.DECIMAL(2,1),
      allowNull:false,
      validate:{
        max:5.0,
        min:1.0
      }
    },
    created:{
      type:DataTypes.BOOLEAN,
      default:true,
    }
  }, {timestamp:false});
};

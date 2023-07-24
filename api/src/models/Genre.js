const {DataTypes} = require ('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Genre',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isNull: {msg:'Name could not be null'}
            }
        }
    },{timestamps:false})
};
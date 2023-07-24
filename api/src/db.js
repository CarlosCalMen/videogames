require('dotenv').config();
const { Sequelize } = require('sequelize');
const videogameModel = require('./models/Videogame.js');
const genreModel = require('./models/Genre.js');
const { 
  DB_DIALECT,DB_USER, DB_PASSWORD, DB_HOST, DB_NAME 
} = process.env;

const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
{
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// // Injectamos la conexion (sequelize) a todos los modelos
videogameModel(sequelize);
genreModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame,Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre,{through:'videogame_genres', as:'genres', timestamps:false});//many to many relationship
Genre.belongsToMany(Videogame,{through:'videogame_genres', as:'genres', timestamps:false});//many to many relationship
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};


// const fs = require('fs');
// const path = require('path');

// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
  //     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });
  // modelDefiners.forEach(model => model(sequelize));
  // // Capitalizamos los nombres de los modelos ie: product => Product
  // let entries = Object.entries(sequelize.models);
  // let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  // sequelize.models = Object.fromEntries(capsEntries);

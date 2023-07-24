require('dotenv').config();
const axios = require('axios');
const {Genre} = require('../db.js');
const URL = 'https://api.rawg.io/api/genres';
const {API_KEY} = process.env;

const getAllGenres = async()=>{
    //check if there is data in Genres table 
    let allGenres = await (Genre.findAll());
    if (!allGenres.length){
        const data = (await axios(`${URL}?key=${API_KEY}`)).data.results;    
        const genres = data.map((genre) => {
            return {name:genre.name}
            });
        allGenres = await Genre.bulkCreate(genres);
        if (!allGenres.length) throw new Error ('Error saving all genres');
    }
    return allGenres;
};

module.exports = getAllGenres;
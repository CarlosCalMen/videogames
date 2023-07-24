require('dotenv').config();
const axios = require('axios');
const {Videogame,Genre} = require('../db.js');
const {Op} = require('sequelize');
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} = process.env;

const getBbddVideogames = async () => {
    const videogameList = await Videogame.findAll({
            attributes:['id','name','image','created'],
            include:{
                model:Genre,
                as:'genres',
                attributes:['name'],
                through:{attributes:[]}
            }})
    const videogames = videogameList.map((videogame)=>({
        ...videogame.toJSON(),
        genres:videogame.genres.map((genre)=>genre.name)})
    );
    return videogames;
};
            
const getApiVideogames = async () => {
    let videogames = [];
    for (let i=1; i<6; i++) {
        const results = (await axios.get(`${URL}?key=${API_KEY}&page=${i}`)).data.results; 
        const aux= results.map((videogame)=>{
            return {id:videogame.id,
                name:videogame.name,
                image:videogame.background_image,
                genres:videogame.genres.map((genre=>genre.name)),
                created:false,
            }
        });
    videogames=[...videogames,...aux];
    };
    return videogames;
};

const getAllVideogames = async () => {
    const bbddVideogames = await getBbddVideogames();
    const apiVideogames = await getApiVideogames();
    return [...bbddVideogames,...apiVideogames];
};
            
const getBbddVideogamesByName = async (name) => {
    const bbddVideogames = await Videogame.findAll({
                attributes:['id','name','image','created'],
                where:{
                    name:{[Op.iLike]:`%${name}%`}
                },
                include:{
                    model:Genre,
                    as:'genres',
                    attributes:['name'],
                    through:{attributes:[]}, 
                },
    });
    const videogames = bbddVideogames.map((videogame)=>({
        ...videogame.toJSON(),
        genres:videogame.genres.map((genre)=>genre.name)})
    );
    return videogames;                    
};

const getApiVideogamesByName = async (name) =>{ 
    const apiVideogames = (await(axios.get(`${URL}?key=${API_KEY}&search=${name}`))).data.results;
    return (apiVideogames.map((videogame)=>{
            return {
                id:videogame.id,
                name:videogame.name,
                image:videogame.background_image,
                genres:videogame.genres.map(genre=>genre.name),
                created:false,
                }}));
};

const getVideogamesByName = async(name) =>{
    const bbddVideoGames = await(getBbddVideogamesByName(name));
    if (bbddVideoGames.length >= 15) return bbddVideoGames.slice(0,15);
    const apiVideogames = await(getApiVideogamesByName(name));
    const videogames = [...bbddVideoGames,...apiVideogames];
    return videogames.slice(0,15);
};

const getApiVideogameById = async(id) => {
    const videogame = (await axios(`${URL}/${id}?key=${API_KEY}`)).data;
            return {
                id:videogame.id,
                name:videogame.name,
                image:videogame.background_image,
                description:videogame.description,
                released:videogame.released,
                rating:videogame.rating,
                genres:videogame.genres.map((genre=>genre.name)),
                platforms:videogame.platforms.map(platform => platform.platform.name),
            };
}; 

const getBbddVideogameById = async(id) => {
    const videogame  =  await Videogame.findByPk(id,
        {
            include:{
                model:Genre,
                as:'genres',
                attributes:['name'],
                through:{attributes:[]},
            }
        });
    return ({...videogame.toJSON(),
            genres:videogame.genres.map((genre)=>genre.name)})
};

const getVideogameById = async(id) => {
    //check if the search is in BBDD or API
    if (!isNaN(id)){//busca en la Api
        try {
          return await (getApiVideogameById(id));
        } 
        catch (error) {
          throw new Error('Id does not exist');   
        }
    }    
    else //busca en la BBDD 
    try {
        return  await (getBbddVideogameById(id));
    } 
    catch (error) {
        throw new Error('Id does not exist');   
    }
};    

const createVideogame = async ({name,image,platforms,description,releaseDate,rating,genres})=>{
    const newVideogame = await (Videogame.create({
                            name,
                            image,
                            platforms,
                            description,
                            releaseDate,
                            rating,genres,
                            }));
    await newVideogame.addGenre(genres);
    return newVideogame;                       
};

module.exports = {getAllVideogames,getVideogameById,getVideogamesByName,createVideogame};


const {
    getVideogamesByName,
    getAllVideogames,
    getVideogameById,
    createVideogame,
    getIdList,
} = require('../controllers/videogamesControllers');

const getVideogameHandler = async(req,res)=>{
    try {
        const {name} = req.query;
        if (name)
            res.status(200).json(await getVideogamesByName(name));
        else
        res.status(200).json(await getAllVideogames());     
    } 
    catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getVideogameByIdHandler = async (req,res) => {
    try {
        const {id} = req.params;
        res.status(200).json(await getVideogameById(id));    
    } 
    catch (error) {
       res.status(400).json({error:error.message});
    }
};

const createVideogameHandler = async (req,res) => {
    try {
        const newVideogame = req.body;
        res.status(201).json(await createVideogame(newVideogame));     
    } 
    catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = {
                getVideogameHandler,
                getVideogameByIdHandler,
                createVideogameHandler,
                };
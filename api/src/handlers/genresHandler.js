const getAllGenres = require('../controllers/genresControllers');

const getGenresHandler = async(req,res) => {
    try {
        res.status(200).json(await getAllGenres());    
    } 
    catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = getGenresHandler;
const {Router} = require('express');
const {
    getVideogameHandler,
    getVideogameByIdHandler,
    createVideogameHandler,
    } = require('../handlers/videogamesHandler.js');

const videoGamesRouter = Router();

videoGamesRouter.get('/',getVideogameHandler);

videoGamesRouter.get('/:id',getVideogameByIdHandler);

videoGamesRouter.post('/',createVideogameHandler); 

module.exports = videoGamesRouter;
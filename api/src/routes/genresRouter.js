const {Router} = require('express');
const getGenresHandler = require('../handlers/genresHandler.js');
const genresRouter = Router();

genresRouter.get('/',getGenresHandler);

module.exports = genresRouter;
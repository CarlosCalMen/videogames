const { Router } = require('express');
// Importar todos los routers;
const genresRouter = require('./genresRouter');
const videogamesRouter = require('./videogamesRouter');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',videogamesRouter);
router.use('/genres',genresRouter);



module.exports = router;

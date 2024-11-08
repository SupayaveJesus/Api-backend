module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/usuario.controller.js");

    // Rutas para Pokémon
    router.get('/all', controller.listUsuariosAll); 
    router.get('/', controller.listUsuarios);                   // Obtener todos los Pokémon
    router.get('/:id', controller.getUsuarioById);            // Obtener un Pokémon por ID
    router.post('/', controller.createUsuario);               // Crear un nuevo Pokémon
    router.put('/:id', controller.updateUsuarioPut);          // Actualizar completamente un Pokémon
    router.patch('/:id', controller.updateUsuarioPatch);      // Actualizar parcialmente un Pokémon
    router.delete('/:id', controller.deleteUsuario);          // Eliminar un Pokémon
    

    // Registrar el router con el prefijo /pokemons
    app.use('/usuarios', router);
};

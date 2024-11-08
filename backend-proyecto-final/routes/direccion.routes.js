module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/direccion.controller.js");

    router.get('/all', controller.listDireccionesAll);
    router.get('/', controller.listDirecciones);
    router.get('/:id', controller.getDireccionById);
    router.post('/', controller.createDireccion);
    router.put('/:id', controller.updateDireccionPatch);
    router.patch('/:id', controller.updateDireccionPut);
    router.delete('/:id', controller.deleteDireccion);
    

    app.use('/direcciones', router);
};

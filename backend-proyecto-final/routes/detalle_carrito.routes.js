module.exports = app => { 
    let router = require("express").Router();
    const controller = require("../controllers/detalle_carrito.controller.js");

    router.get('/all', controller.listDetallesCarritoAll);
    router.get('/', controller.listDetallesCarrito);
    router.get('/:id', controller.getDetalleCarritoById);
    router.post('/', controller.createDetalleCarrito);
    router.put('/:id', controller.updateDetalleCarritoPut);
    router.patch('/:id', controller.updateDetalleCarritoPatch);
    router.delete('/:id', controller.deleteDetalleCarrito);
    
    app.use('/detalles_carrito', router);
};

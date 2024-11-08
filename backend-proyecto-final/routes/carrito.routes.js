module.exports = app => { 
    let router = require("express").Router();
    const controller = require("../controllers/carrito.controller.js");

    router.get('/all', controller.listCarritosAll);
    router.get('/', controller.listCarritos);
    router.get('/:id', controller.getCarritoById);
    router.post('/', controller.createCarrito);
    router.put('/:id', controller.updateCarritoPut);
    router.patch('/:id', controller.updateCarritoPatch);
    router.delete('/:id', controller.deleteCarrito);
    
    app.use('/carritos', router);
};

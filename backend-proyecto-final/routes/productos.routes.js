module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/producto.controller.js");

    router.get('/all', controller.listProductosAll);
    router.get('/', controller.listProductos);
    router.get('/:id', controller.getProductoById);
    router.post('/', controller.createProducto);
    router.put('/:id', controller.updateProductoPatch);
    router.patch('/:id', controller.updateProductoPut);
    router.delete('/:id', controller.deleteProducto);
    

    app.use('/productos', router);
};

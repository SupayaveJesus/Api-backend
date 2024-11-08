module.exports = app => { 
    let router = require("express").Router();
    const controller = require("../controllers/detalle_pedido.controller.js");

    router.get('/all', controller.listDetallesPedidoAll);
    router.get('/', controller.listDetallesPedido);
    router.get('/:id', controller.getDetallePedidoById);
    router.post('/', controller.createDetallePedido);
    router.put('/:id', controller.updateDetallePedidoPut);
    router.patch('/:id', controller.updateDetallePedidoPatch);
    router.delete('/:id', controller.deleteDetallePedido);
    
    app.use('/detalles_pedido', router);
};

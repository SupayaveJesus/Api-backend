module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pedido.controller.js");


    router.get('/:id', controller.getPedidoById);
    router.post('/', controller.createPedido);
    router.patch('/:id', controller.updatePedidoPatch);
    router.put('/:id', controller.updatePedidoPut);
    router.delete('/:id', controller.deletePedido);
    router.get('/', controller.listPedidos);
    router.get('/all', controller.listPedidosAll);
    
    

    app.use('/pedidos', router);
};

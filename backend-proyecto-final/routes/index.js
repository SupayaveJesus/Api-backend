module.exports = app => {
   
    require('./usuarios.routes')(app);
    
    require('./productos.routes')(app);

    require('./direccion.routes')(app);

    require('./pedidos.routes')(app);

    require('./detalle_pedido.routes')(app);

    require('./detalle_carrito.routes')(app);

    require('./carrito.routes')(app);

    


}
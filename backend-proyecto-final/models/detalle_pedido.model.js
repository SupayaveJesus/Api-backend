module.exports = (sequelize, Sequelize) => {
    const detalle_pedido = sequelize.define("detalle_pedido", {
        id_pedido: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        } ,
        precio_unitario:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        
        tableName: 'detalle_pedido'
    });

    return detalle_pedido;
};

module.exports = (sequelize, Sequelize) => {
    const detalle_carrito = sequelize.define("detalle_carrito", {
        id_carrito: {
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
        }, 
        precio_unitario:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        sub_total:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }

    }, {
        
        tableName: 'detalle_carrito'
    });

    return detalle_carrito;
};

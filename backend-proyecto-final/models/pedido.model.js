module.exports = (sequelize, Sequelize) => {
    const pedido = sequelize.define("pedido", {
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuario',
                key: 'id'         
            }
        },
        id_direccion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fecha_pedido: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        total:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'pedido'
    });

    return pedido;
};

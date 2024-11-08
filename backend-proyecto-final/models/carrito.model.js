module.exports = (sequelize, Sequelize) => {
    const carrito = sequelize.define("carrito", {
        usuarioId: {  // Este es el foreignKey que referenciará a usuario
            type: Sequelize.INTEGER,
            references: {
                model: 'usuario', 
                key: 'id'         
            }
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        total:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        
        tableName: 'carrito'
    });

    return carrito;
};

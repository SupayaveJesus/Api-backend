module.exports = (sequelize, Sequelize) => {
    const producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: Sequelize.STRING,
            allowNull: false
        },
        peso: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        
        tableName: 'producto'
    });

    return producto;
};

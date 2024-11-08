module.exports = (sequelize, Sequelize) => {
    const valoracion = sequelize.define("valoracion", {
        usuarioId: {  // Este es el foreignKey que referenciará a usuario
            type: Sequelize.INTEGER,
            references: {
                model: 'usuario', // Nombre de la tabla de referencia
                key: 'id'         // Nombre de la columna en la tabla de referencia
            }
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        calificacion: {
            type: Sequelize.STRING,
            allowNull: false
        },   
        comentario: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {    
        tableName: 'valoracion'

    });

    return valoracion;
};

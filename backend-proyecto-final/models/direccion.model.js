module.exports = (sequelize, Sequelize) => {
    const direccion = sequelize.define("direccion", {
        usuarioId: {  // Este es el foreignKey que referenciará a usuario
            type: Sequelize.INTEGER,
            references: {
                model: 'usuario', // Nombre de la tabla de referencia
                key: 'id'         // Nombre de la columna en la tabla de referencia
            }
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ciudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
         estado: {
            type: Sequelize.STRING,
            allowNull: true
        },  
        tipo:{
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: 'direccion'
           
    });

    return direccion;
};

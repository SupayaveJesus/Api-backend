module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        contrasena: {
            type: Sequelize.TEXT
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'cliente' // Valor predeterminado para el campo `rol`
        },
        fecha_registro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW // Valor predeterminado a la fecha y hora actuales
        },
    }, {
        
        tableName: 'usuario'
    });

    return Usuario;
};

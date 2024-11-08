const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "postgres",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos

db.usuario = require('./usuario.model.js')(sequelize, Sequelize);
db.direccion = require('./direccion.model.js')(sequelize, Sequelize);
db.pedido = require('./pedido.model.js')(sequelize, Sequelize);
db.detalle_pedido = require('./detalle_pedido.model.js')(sequelize, Sequelize);
db.detalle_carrito = require('./detalle_carrito.model.js')(sequelize, Sequelize);
db.carrito = require('./carrito.model.js')(sequelize, Sequelize);
db.producto = require('./producto.model.js')(sequelize, Sequelize);
db.valoracion = require('./valoracion.model.js')(sequelize, Sequelize);

// Usuario y Direccion (1:N)
db.usuario.hasMany(db.direccion, { foreignKey: "usuarioId", as: "direcciones" });
db.direccion.belongsTo(db.usuario, { foreignKey: "usuarioId", as: "usuario" });


// Usuario y Pedido (1:N)
db.usuario.hasMany(db.pedido, { foreignKey: "usuarioId", as: "pedidos" });
db.pedido.belongsTo(db.usuario, { foreignKey: "usuarioId", as: "usuario" });

// Pedido y Direccion (1:1)
db.pedido.belongsTo(db.direccion, { foreignKey: "id_direccion", as: "direccion" });
db.direccion.hasOne(db.pedido, { foreignKey: "id_direccion", as: "pedido" });

// Pedido y Detalle_Pedido (1:N)
db.pedido.hasMany(db.detalle_pedido, { foreignKey: "id_pedido", as: "detallesPedido" });
db.detalle_pedido.belongsTo(db.pedido, { foreignKey: "id_pedido", as: "pedido" });

// Producto y Detalle_Pedido (1:N)
db.producto.hasMany(
    db.detalle_pedido, { foreignKey: "id_producto", as: "detallesPedido" });
db.detalle_pedido.belongsTo(db.producto, { foreignKey: "id_producto", as: "producto" });

// Usuario y Carrito (1:N)
db.usuario.hasMany(db.carrito, { foreignKey: "usuarioId", as: "carritos" });
db.carrito.belongsTo(db.usuario, { foreignKey: "usuarioId", as: "usuario" });

// Carrito y Detalle_Carrito (1:N)
db.carrito.hasMany(db.detalle_carrito, { foreignKey: "id_carrito", as: "detallesCarrito" });
db.detalle_carrito.belongsTo(db.carrito, { foreignKey: "id_carrito", as: "carrito" });

// Producto y Detalle_Carrito (1:N)
db.producto.hasMany(db.detalle_carrito, { foreignKey: "id_producto", as: "detallesCarrito" });
db.detalle_carrito.belongsTo(db.producto, { foreignKey: "id_producto", as: "producto" });

// Usuario y Valoracion (1:N)
db.usuario.hasMany(db.valoracion, { foreignKey: "usuarioId", as: "valoraciones" });
db.valoracion.belongsTo(db.usuario, { foreignKey: "usuarioId", as: "usuario" });

// Producto y Valoracion (1:N)
db.producto.hasMany(db.valoracion, { foreignKey: "id_producto", as: "valoraciones" });
db.valoracion.belongsTo(db.producto, { foreignKey: "id_producto", as: "producto" });







module.exports = db;

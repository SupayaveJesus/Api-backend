const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listProductosAll = async (req, res) => {
    try {
        const productos = await db.producto.findAll({
            include: [
                {
                    model: db.detalle_pedido,
                    as: 'detallesPedido',
                    include: [
                        {
                            model: db.pedido,
                            as: 'pedido',
                            include: [
                                {
                                    model: db.usuario,
                                    as: 'usuario',
                                    attributes: []
                                },
                                {
                                    model: db.direccion,
                                    as: 'direccion',
                                    attributes: []
                                }
                            ],
                            attributes: []
                        }
                    ],
                    attributes: []
                },
                {
                    model: db.detalle_carrito,
                    as: 'detallesCarrito',
                    include: [
                        {
                            model: db.carrito,
                            as: 'carrito',
                            include: [
                                {
                                    model: db.usuario,
                                    as: 'usuario',
                                    attributes: []
                                }
                            ],
                            attributes: []
                        }
                    ],
                    attributes: []
                },
                {
                    model: db.valoracion,
                    as: 'valoraciones',
                    include: [
                        {
                            model: db.usuario,
                            as: 'usuario',
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            attributes: []
        });

        res.json(productos);
    } catch (error) {
        console.error("Error al listar productos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.listProductos = async (req, res) => {
    try {
        const productos = await db.producto.findAll();
        res.json(productos);
    } catch (error) {
        console.error("Error al listar productos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.getProductoById = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await db.producto.findOne({
            where: { id: id },
            include: [
                {
                    model: db.detalle_pedido,
                    as: 'detallesPedido',
                    include: [
                        {
                            model: db.pedido,
                            as: 'pedido',
                            include: [
                                {
                                    model: db.usuario,
                                    as: 'usuario',
                                    attributes: []
                                },
                                {
                                    model: db.direccion,
                                    as: 'direccion',
                                    attributes: []
                                }
                            ],
                            attributes: []
                        }
                    ],
                    attributes: []
                },
                {
                    model: db.detalle_carrito,
                    as: 'detallesCarrito',
                    include: [
                        {
                            model: db.carrito,
                            as: 'carrito',
                            include: [
                                {
                                    model: db.usuario,
                                    as: 'usuario',
                                    attributes: []
                                }
                            ],
                            attributes: []
                        }
                    ],
                    attributes: []
                },
                {
                    model: db.valoracion,
                    as: 'valoraciones',
                    include: [
                        {
                            model: db.usuario,
                            as: 'usuario',
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            attributes: []
        });

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.createProducto = async (req, res) => {
    const requiredFields = [
        'nombre', 'descripcion', 'precio', 'stock', 'peso'
    ];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            peso: req.body.peso
        };

        const nuevoProducto = await db.producto.create(producto);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




exports.updateProductoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await db.producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        producto.nombre = req.body.nombre || producto.nombre;
        producto.descripcion = req.body.descripcion || producto.descripcion;
        producto.precio = req.body.precio || producto.precio;
        producto.stock = req.body.stock || producto.stock;
        producto.peso = req.body.peso || producto.peso;

        await producto.save();

        res.json(producto);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.updateProductoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await db.producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const requiredFields = ['nombre', 'descripcion', 'precio', 'stock', 'peso'];
        
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.precio = req.body.precio;
        producto.stock = req.body.stock;
        producto.peso = req.body.peso;

        await producto.save();

        res.json(producto);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};





exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await db.producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await producto.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




async function getProductoOr404(id, res) {
    const producto = await db.producto.findByPk(id);
    if (!producto) {
        res.status(404).json({
            msg: 'Producto no encontrado'
        });
        return;
    }
    return producto;
}


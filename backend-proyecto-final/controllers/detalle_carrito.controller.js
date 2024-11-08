const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listDetallesCarritoAll = async (req, res) => {
    try {
        const detallesCarrito = await db.detalle_carrito.findAll({
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
                },
                {
                    model: db.producto,
                    as: 'producto',
                    attributes: []
                }
            ],
            attributes: []
        });

        res.json(detallesCarrito);
    } catch (error) {
        console.error("Error al listar detalles de carrito:", error);
        sendError500(res, error);
    }
};

exports.listDetallesCarrito = async (req, res) => {
    try {
        const detallesCarrito = await db.detalle_carrito.findAll();
        res.json(detallesCarrito);
    } catch (error) {
        console.error("Error al listar detalles del carrito:", error);
        sendError500(res, error);
    }
};
exports.getDetalleCarritoById = async (req, res) => {
    const id = req.params.id;
    try {
        const detalleCarrito = await db.detalle_carrito.findOne({
            where: { id },
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
                },
                {
                    model: db.producto,
                    as: 'producto',
                    attributes: []
                }
            ],
            attributes: []
        });

        if (!detalleCarrito) {
            return res.status(404).json({ message: "Detalle de carrito no encontrado" });
        }

        res.json(detalleCarrito);
    } catch (error) {
        console.error("Error al obtener detalle de carrito por ID:", error);
        sendError500(res, error);
    }
};

exports.createDetalleCarrito = async (req, res) => {
    const requiredFields = ['id_carrito', 'id_producto', 'cantidad', 'precio_unitario'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const detalleCarrito = {        
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto,
            cantidad: req.body.cantidad,
            precio_unitario: req.body.precio_unitario
        };

        const nuevoDetalleCarrito = await db.detalle_carrito.create(detalleCarrito);
        res.status(201).json(nuevoDetalleCarrito);
    } catch (error) {
        console.error("Error al crear detalle de carrito:", error);
        sendError500(res, error);
    }
};

exports.updateDetalleCarritoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const detalleCarrito = await db.detalle_carrito.findByPk(id);

        if (!detalleCarrito) {
            return res.status(404).json({ message: "Detalle de carrito no encontrado" });
        }

        detalleCarrito.id_carrito = req.body.id_carrito || detalleCarrito.id_carrito;
        detalleCarrito.id_producto = req.body.id_producto || detalleCarrito.id_producto;
        detalleCarrito.cantidad = req.body.cantidad || detalleCarrito.cantidad;
        detalleCarrito.precio_unitario = req.body.precio_unitario || detalleCarrito.precio_unitario;

        await detalleCarrito.save();

        res.json(detalleCarrito);
    } catch (error) {
        console.error("Error al actualizar detalle de carrito:", error);
        sendError500(res, error);
    }
};

exports.updateDetalleCarritoPut = async (req, res) => {
    const id = req.params.id;
    const requiredFields = ['id_carrito', 'id_producto', 'cantidad', 'precio_unitario'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const detalleCarrito = await db.detalle_carrito.findByPk(id);

        if (!detalleCarrito) {
            return res.status(404).json({ message: "Detalle de carrito no encontrado" });
        }

        detalleCarrito.id_carrito = req.body.id_carrito;
        detalleCarrito.id_producto = req.body.id_producto;
        detalleCarrito.cantidad = req.body.cantidad;
        detalleCarrito.precio_unitario = req.body.precio_unitario;

        await detalleCarrito.save();

        res.json(detalleCarrito);
    } catch (error) {
        console.error("Error al actualizar detalle de carrito:", error);
        sendError500(res, error);
    }
};

exports.deleteDetalleCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const detalleCarrito = await db.detalle_carrito.findByPk(id);

        if (!detalleCarrito) {
            return res.status(404).json({ message: "Detalle de carrito no encontrado" });
        }

        await detalleCarrito.destroy();
        res.json({ message: 'Detalle de carrito eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar detalle de carrito:", error);
        sendError500(res, error);
    }
};

async function getDetalleCarritoOr404(id, res) {
    const detalleCarrito = await db.detalle_carrito.findByPk(id, { attributes: [] });
    if (!detalleCarrito) {
        res.status(404).json({
            msg: 'Detalle de carrito no encontrado'
        });
        return;
    }
    return detalleCarrito;
}

const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listDetallesPedidoAll = async (req, res) => {
    try {
        const detallesPedido = await db.detalle_pedido.findAll({
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
                },
                {
                    model: db.producto,
                    as: 'producto',
                    attributes: []
                }
            ],
            attributes: []
        });

        res.json(detallesPedido);
    } catch (error) {
        console.error("Error al listar detalles de pedido:", error);
        sendError500(res, error);
    }
};

exports.listDetallesPedido = async (req, res) => {
    try {
        const detallesPedido = await db.detalle_pedido.findAll();
        res.json(detallesPedido);
    } catch (error) {
        console.error("Error al listar detalles de pedido:", error);
        sendError500(res, error);
    }
};

exports.getDetallePedidoById = async (req, res) => {
    const id = req.params.id;
    try {
        const detallePedido = await db.detalle_pedido.findOne({
            where: { id },
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
                },
                {
                    model: db.producto,
                    as: 'producto',
                    attributes: []
                }
            ],
            attributes: []
        });

        if (!detallePedido) {
            return res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }

        res.json(detallePedido);
    } catch (error) {
        console.error("Error al obtener detalle de pedido por ID:", error);
        sendError500(res, error);
    }
};

exports.createDetallePedido = async (req, res) => {
    const requiredFields = ['id_pedido', 'id_producto', 'cantidad', 'precio_unitario'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const detallePedido = {
            id_pedido: req.body.id_pedido,
            id_producto: req.body.id_producto,
            cantidad: req.body.cantidad,
            precio_unitario: req.body.precio_unitario
        };

        const nuevoDetallePedido = await db.detalle_pedido.create(detallePedido);
        res.status(201).json(nuevoDetallePedido);
    } catch (error) {
        console.error("Error al crear detalle de pedido:", error);
        sendError500(res, error);
    }
};

exports.updateDetallePedidoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const detallePedido = await db.detalle_pedido.findByPk(id);

        if (!detallePedido) {
            return res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }

        detallePedido.id_pedido = req.body.id_pedido || detallePedido.id_pedido;
        detallePedido.id_producto = req.body.id_producto || detallePedido.id_producto;
        detallePedido.cantidad = req.body.cantidad || detallePedido.cantidad;
        detallePedido.precio_unitario = req.body.precio_unitario || detallePedido.precio_unitario;

        await detallePedido.save();

        res.json(detallePedido);
    } catch (error) {
        console.error("Error al actualizar detalle de pedido:", error);
        sendError500(res, error);
    }
};

exports.updateDetallePedidoPut = async (req, res) => {
    const id = req.params.id;
    const requiredFields = ['id_pedido', 'id_producto', 'cantidad', 'precio_unitario'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const detallePedido = await db.detalle_pedido.findByPk(id);

        if (!detallePedido) {
            return res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }

        detallePedido.id_pedido = req.body.id_pedido;
        detallePedido.id_producto = req.body.id_producto;
        detallePedido.cantidad = req.body.cantidad;
        detallePedido.precio_unitario = req.body.precio_unitario;

        await detallePedido.save();

        res.json(detallePedido);
    } catch (error) {
        console.error("Error al actualizar detalle de pedido:", error);
        sendError500(res, error);
    }
};

exports.deleteDetallePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const detallePedido = await db.detalle_pedido.findByPk(id);

        if (!detallePedido) {
            return res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }

        await detallePedido.destroy();
        res.json({ message: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar detalle de pedido:", error);
        sendError500(res, error);
    }
};

async function getDetallePedidoOr404(id, res) {
    const detallePedido = await db.detalle_pedido.findByPk(id, { attributes: [] });
    if (!detallePedido) {
        res.status(404).json({
            msg: 'Detalle de pedido no encontrado'
        });
        return;
    }
    return detallePedido;
}

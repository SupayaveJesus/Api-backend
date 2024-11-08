const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listPedidosAll = async (req, res) => {
    try {
        const pedidos = await db.pedido.findAll({
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
                },
                {
                    model: db.detalle_pedido,
                    as: 'detallesPedido',
                    include: [
                        {
                            model: db.producto,
                            as: 'producto',
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            attributes: []
        });

        res.json(pedidos);
    } catch (error) {
        console.error("Error al listar pedidos:", error);
        sendError500(res, error);
    }
};

exports.listPedidos = async (req, res) => {
    try {
        const pedidos = await db.pedido.findAll();

        res.json(pedidos);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.getPedidoById = async (req, res) => {
    const id = req.params.id;
    try {
        const pedido = await db.pedido.findOne({
            where: { id },
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
                },
                {
                    model: db.detalle_pedido,
                    as: 'detallesPedido',
                    include: [
                        {
                            model: db.producto,
                            as: 'producto',
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            attributes: []
        });

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json(pedido);
    } catch (error) {
        console.error("Error al obtener pedido por ID:", error);
        sendError500(res, error);
    }
};

exports.createPedido = async (req, res) => {
    const requiredFields = ['usuarioId', 'id_direccion', 'estado', 'total'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const pedido = {
            usuarioId: req.body.usuarioId,
            id_direccion: req.body.id_direccion,
            estado: req.body.estado,
            total: req.body.total,
            fecha_pedido: new Date()
        };

        const nuevoPedido = await db.pedido.create(pedido);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error("Error al crear pedido:", error);
        sendError500(res, error);
    }
};

exports.updatePedidoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const pedido = await db.pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        pedido.fecha_pedido = req.body.fecha_pedido || pedido.fecha_pedido;
        pedido.estado = req.body.estado || pedido.estado;
        pedido.total = req.body.total || pedido.total;

        await pedido.save();

        res.json(pedido);
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        sendError500(res, error);
    }
};

exports.updatePedidoPut = async (req, res) => {
    const id = req.params.id;
    const requiredFields = ['fecha_pedido', 'estado', 'total'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const pedido = await db.pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        pedido.fecha_pedido = req.body.fecha_pedido;
        pedido.estado = req.body.estado;
        pedido.total = req.body.total;

        await pedido.save();

        res.json(pedido);
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        sendError500(res, error);
    }
};

exports.deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await db.pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await pedido.destroy();
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar pedido:", error);
        sendError500(res, error);
    }
};

async function getPedidoOr404(id, res) {
    const pedido = await db.pedido.findByPk(id);
    if (!pedido) {
        res.status(404).json({
            msg: 'Pedido no encontrado'
        });
        return;
    }
    return usuario;
}

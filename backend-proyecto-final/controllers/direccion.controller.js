const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listDireccionesAll = async (req, res) => {
    try {
        const direcciones = await db.direccion.findAll({
            include: [
                {
                    model: db.usuario,
                    as: 'usuario',
                    attributes: []
                },
                {
                    model: db.pedido,
                    as: 'pedidos',
                    include: [
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
                }
            ],
            attributes: []
        });

        res.json(direcciones);
    } catch (error) {
        console.error("Error al listar direcciones:", error);
        sendError500(res, error);
    }
};

exports.listDirecciones = async (req, res) => {
    try {
        const direcciones = await db.direccion.findAll();
        res.json(direcciones);
    } catch (error) {
        console.error("Error al listar direcciones:", error);
        sendError500(res, error);
    }
};

exports.getDireccionById = async (req, res) => {
    const id = req.params.id;
    try {
        const direccion = await db.direccion.findOne({
            where: { id },
            include: [
                {
                    model: db.usuario,
                    as: 'usuario',
                    attributes: []
                },
                {
                    model: db.pedido,
                    as: 'pedidos',
                    include: [
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
                }
            ],
            attributes: []
        });

        if (!direccion) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        res.json(direccion);
    } catch (error) {
        console.error("Error al obtener dirección por ID:", error);
        sendError500(res, error);
    }
};

exports.createDireccion = async (req, res) => {
    const requiredFields = ['usuarioId', 'direccion', 'ciudad', 'estado', 'tipo'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const direccion = {
            usuarioId : req.body.usuarioId,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            estado: req.body.estado,
            tipo: req.body.tipo
        };

        const nuevaDireccion = await db.direccion.create(direccion);
        res.status(201).json(nuevaDireccion);
    } catch (error) {
        console.error("Error al crear dirección:", error);
        sendError500(res, error);
    }
};

exports.updateDireccionPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const direccion = await db.direccion.findByPk(id);

        if (!direccion) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }
        direccion.usuarioId = req.body.usuarioId || direccion.usuarioId;
        direccion.direccion = req.body.direccion || direccion.direccion;
        direccion.ciudad = req.body.ciudad || direccion.ciudad;
        direccion.estado = req.body.estado || direccion.estado;
        direccion.tipo = req.body.tipo || direccion.tipo;

        await direccion.save();

        res.json(direccion);
    } catch (error) {
        console.error("Error al actualizar dirección:", error);
        sendError500(res, error);
    }
};

exports.updateDireccionPut = async (req, res) => {
    const id = req.params.id;
    const requiredFields = ['direccion', 'ciudad', 'estado', 'tipo'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const direccion = await db.direccion.findByPk(id);

        if (!direccion) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        direccion.direccion = req.body.direccion;
        direccion.ciudad = req.body.ciudad;
        direccion.estado = req.body.estado;
        direccion.tipo = req.body.tipo;

        await direccion.save();

        res.json(direccion);
    } catch (error) {
        console.error("Error al actualizar dirección:", error);
        sendError500(res, error);
    }
};

exports.deleteDireccion = async (req, res) => {
    const { id } = req.params;
    try {
        const direccion = await db.direccion.findByPk(id);

        if (!direccion) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        await direccion.destroy();
        res.json({ message: 'Dirección eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar dirección:", error);
        sendError500(res, error);
    }
};

async function getDireccionOr404(id, res) {
    const direccion = await db.direccion.findByPk(id, { attributes: [] });
    if (!direccion) {
        res.status(404).json({
            msg: 'Dirección no encontrada'
        });
        return;
    }
    return direccion;
}

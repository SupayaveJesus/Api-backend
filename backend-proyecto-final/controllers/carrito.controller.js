const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listCarritosAll = async (req, res) => {
    try {
        const carritos = await db.carrito.findAll({
            include: [
                {
                    model: db.usuario,
                    as: 'usuario',
                    attributes: []
                },
                {
                    model: db.detalle_carrito,
                    as: 'detallesCarrito',
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

        res.json(carritos);
    } catch (error) {
        console.error("Error al listar carritos:", error);
        sendError500(res, error);
    }
};

exports.listCarritos = async (req, res) => {
    try {
        const carritos = await db.carrito.findAll();
        res.json(carritos);
    } catch (error) {
        console.error("Error al listar carritos:", error);
        sendError500(res, error);
    }
};

exports.getCarritoById = async (req, res) => {
    const id = req.params.id;
    try {
        const carrito = await db.carrito.findOne({
            where: { id },
            include: [
                {
                    model: db.usuario,
                    as: 'usuario',
                    attributes: []
                },
                {
                    model: db.detalle_carrito,
                    as: 'detallesCarrito',
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

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.json(carrito);
    } catch (error) {
        console.error("Error al obtener carrito por ID:", error);
        sendError500(res, error);
    }
};

exports.createCarrito = async (req, res) => {
    const requiredFields = ['usuarioId', 'total'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const carrito = {
            usuarioId: req.body.usuarioId,
            fecha_creacion: req.body.fecha_creacion || new Date(),
            total: req.body.total
        };

        const nuevoCarrito = await db.carrito.create(carrito);
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear carrito:", error);
        sendError500(res, error);
    }
};

exports.updateCarritoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const carrito = await db.carrito.findByPk(id);

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        carrito.usuarioId = req.body.usuarioId || carrito.usuarioId;
        carrito.fecha_creacion = req.body.fecha_creacion || carrito.fecha_creacion;
        carrito.total = req.body.total || carrito.total;

        await carrito.save();

        res.json(carrito);
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        sendError500(res, error);
    }
};

exports.updateCarritoPut = async (req, res) => {
    const id = req.params.id;
    const requiredFields = ['usuarioId', 'total'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const carrito = await db.carrito.findByPk(id);

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        carrito.usuarioId = req.body.usuarioId;
        carrito.fecha_creacion = req.body.fecha_creacion || new Date();
        carrito.total = req.body.total;

        await carrito.save();

        res.json(carrito);
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        sendError500(res, error);
    }
};

exports.deleteCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const carrito = await db.carrito.findByPk(id);

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        await carrito.destroy();
        res.json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
        sendError500(res, error);
    }
};

async function getCarritoOr404(id, res) {
    const carrito = await db.carrito.findByPk(id, { attributes: [] });
    if (!carrito) {
        res.status(404).json({
            msg: 'Carrito no encontrado'
        });
        return;
    }
    return carrito;
}

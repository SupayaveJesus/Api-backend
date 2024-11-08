const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.listUsuariosAll = async (req, res) => {
    try {
        const usuarios = await db.usuario.findAll({
            include: [
                { 
                    model: db.direccion, 
                    as: 'direcciones',
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
                },
                { 
                    model: db.carrito, 
                    as: 'carritos', 
                    include: [
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
                },
                { 
                    model: db.valoracion, 
                    as: 'valoraciones',
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
            attributes: [], 
            
        });

        res.json(usuarios);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

exports.listUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuario.findAll({
            
        });

        res.json(usuarios);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.getUsuarioById = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await db.usuario.findOne({
            where: { id_usuario: id },
            include: [
                { 
                    model: db.direccion, 
                    as: 'direcciones',
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
                },
                { 
                    model: db.carrito, 
                    as: 'carritos', 
                    include: [
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
                },
                { 
                    model: db.valoracion, 
                    as: 'valoraciones',
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

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.createUsuario = async (req, res) => {
    const requiredFields = [
        'nombre', 'correo', 'contrasena', 
        'telefono'
    ];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    
    try {
        const usuario = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena, 
            telefono: req.body.telefono,
            fecha_registro: new Date()
        };

        const nuevoUsuario = await db.usuario.create(usuario);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.updateUsuarioPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await db.usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.correo = req.body.correo || usuario.correo;
        usuario.contrasena = req.body.contrasena || usuario.contrasena;
       
        usuario.telefono = req.body.telefono || usuario.telefono;
        usuario.rol = req.body.rol || usuario.rol;
    

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.updateUsuarioPut = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await db.usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const requiredFields = ['nombre', 'correo', 'contrasena', 'telefono'];
        
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;

        usuario.contrasena = req.body.contrasena;
        usuario.telefono = req.body.telefono;

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await db.usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




async function getUsuarioOr404(id, res) {
    const usuario = await db.usuario.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: 'Usuario no encontrado'
        });
        return;
    }
    return usuario;
}


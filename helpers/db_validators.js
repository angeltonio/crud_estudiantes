const Estudiantes = require("../models/estudiantes");
const Grupos = require("../models/grupos");
const ObjectId = require('mongoose').Types.ObjectId; 


const existeGrupoPorName = async (name) => {
    const existegrupo = await Grupos.findOne({name: name});

    if(existegrupo) {
        throw new Error(`El grupo con nombre ${name} ya existe por favor cree otro`);

    }
}

// Esto se puede validar con otra cosa, con correo electronico, o algo que sea unico para el usuario, 
// lo puse nombre para hacerlo lo mas basico posible, pero puede cambiarse sin problemas
const existeNameEstudiante = async (name) => {
    const existegrupo = await Estudiantes.findOne({name: name});

    if(existegrupo) {
        throw new Error(`Ya existe un estudiante con el nombre ${name} por favor ponga otro nombre..`);

    }
}

const existeGrupoPorID = async (group) => {
    const existegrupoporID = await Grupos.findById(group);
    if(!existegrupoporID) {
        throw new Error(`No existe un grupo con el id ${group} por lo que no se puede agregar al estudiante verique el ID del Grupo`);

    }
}




module.exports = {
    existeGrupoPorName,
    existeNameEstudiante,
    existeGrupoPorID
}
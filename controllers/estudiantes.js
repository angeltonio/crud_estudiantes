const {response} = require('express');
const Estudiante = require('../models/estudiantes');
const Grupos = require('../models/grupos');

const ObjectId = require('mongoose').Types.ObjectId; 



const estudiantesGet = async (req, res=response) => {
    //se puede hacer paginacion igual, pero como era hacerlo lo mas rapido posible.....
     const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(),
        Estudiante.find().populate('group', 'name profesor')
     ]);
      res.json({
        total, 
        estudiantes,
      });
    }
  

    const estudiantesGetName = async (req, res=response) => {
  
       const {name} = req.params
       const estudiante = 
          await Estudiante.findOne({name:name}).populate('group', 'name profesor')
       if(!estudiante) {
         return res.status(400).json({msg: 'El estudiante con ese nombre no existe'})
       }

        res.json({
          estudiante,
        });
      }
  
    const estudiantesPut = async (req, res = response) => {
       const {id} = req.params;
       const {_id, ...resto} = req.body;
       const estudiante = await Estudiante.findByIdAndUpdate(id, resto, {new: true});
      res.json({
          usuario               
    });
    } 
  
  
  
  const estudiantesPost = async (req, res =response) => {
      const {name, age, sex, email, city, group} = req.body;
      const estudiante = new Estudiante({name,age,sex,email,city, group});
      await estudiante.save();     
      const grupobusqueda = await Grupos.findOne(
        { _id: ObjectId(group)}) 
      const estudiantebusqueda = await Estudiante.findOne({email:email})
      grupobusqueda.students.push(estudiantebusqueda._id);  
      grupobusqueda.save();
      res.status(201).json({
        estudiante
      });

    }
  
  
  const estudianteDelete = async (req, res=response) => {
  
    const {id} = req.params;
     //fisicamente adios normalmente no borro directamente de la BD lo que normalmente es cambiandole una variable state true o false
     //y de ahi es que hago las consultas a partir de ese valor si esta en true o false
     const estudiante = await Estudiante.findByIdAndDelete(id);  
    //change state
    //  const estudiante = await Estudiante.findByIdAndUpdate(id, {state:false});
    //  const usuarioAutenticado = req.usuario; 
      res.json({        
        estudiante,
        // usuarioAutenticado 
      });
    }
  
  
  
    module.exports = {
      estudiantesGet,
      estudiantesPut,
      estudiantesPost,
      estudianteDelete,
      estudiantesGetName

    }
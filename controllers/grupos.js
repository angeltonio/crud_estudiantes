const {response} = require('express');
const Grupo = require('../models/grupos');


const gruposGet = async (req, res=response) => {
    //check pagination
     const [total, grupos] = await Promise.all([
        Grupo.countDocuments(),
        Grupo.find().populate('students', 'name')
     ]);
      res.json({
        // resp   
        total, 
        grupos,
      });
    }
  
  
    const gruposPut = async (req, res = response) => {
       const {id} = req.params;
       const {_id, ...resto} = req.body;
       const grupo = await Grupo.findByIdAndUpdate(id, resto, {new: true});
      res.json({
        grupo               
    });
    } 
  
  
    const gruposGetOne = async (req, res=response) => {
  
      const {name} = req.params
      const grupo = 
         await Grupo.findOne({name:name}).populate('students')
      if(!grupo) {
        return res.status(400).json({msg: 'El grupo con ese nombre no existe'})
      }

       res.json({
        grupo,
       });
     }
 
  
  const gruposPost = async (req, res =response) => {
      const {name, profesor} = req.body;
      const grupo = new Grupo({name, profesor});
      //save database
      await grupo.save();
      res.status(201).json({
        grupo
      });
    }
  
  
  const gruposDelete = async (req, res=response) => {
  
    const {id} = req.params;
     //fisicamente adios normalmente no borro directamente de la BD lo que normalmente es cambiandole una variable state true o false
     //y de ahi es que hago las consultas a partir de ese valor si esta en true o false
     const grupos = await Grupo.findByIdAndDelete(id);  
    //change state
    //  const usuario = await Usuario.findByIdAndUpdate(id, {state:false});
    //  const usuarioAutenticado = req.usuario; 
      res.json({        
        grupos,
        // usuarioAutenticado 
      });
    }
  
  
  
    module.exports = {
       gruposGet,
       gruposGetOne,
       gruposPut,
       gruposPost,
       gruposDelete,

    }
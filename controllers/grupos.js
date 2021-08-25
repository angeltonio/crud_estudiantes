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

    const gruposGetProfesores = async (req, res=response) => {
         const profesores = await Grupo.find().select('profesor');
         
        res.json({
          // resp   
        profesores: profesores
        });
      }
  
  
    const gruposPut = async (req, res = response) => {
      const {name} = req.params;
      const {_id,students, ...resto} = req.body;
      const grupobusqueda = await Grupo.findOne({name:name})
      
      const grupo = await Grupo.findByIdAndUpdate(grupobusqueda.id, resto, {new: true});
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

    console.log('entro');
  
    const {name} = req.params;

    const grupodelete = await Grupo.findOne({name:name})
     //fisicamente adios normalmente no borro directamente de la BD lo que normalmente es cambiandole una variable state true o false
     //y de ahi es que hago las consultas a partir de ese valor si esta en true o false

     //Aqui no valide lo de eliminar el dato del 
     //usuario porque no sabia el tiempo que tenia para entregar esto..pero es usar las funciones que 
     //ya estan hechas o hacer otra similares..ya que cuando se consulta devuelve null
     const grupos = await Grupo.findByIdAndDelete(grupodelete.id);  
 
      res.json({        
        grupos,
      });
    }
  
  
  
    module.exports = {
       gruposGet,
       gruposGetOne,
       gruposPut,
       gruposPost,
       gruposDelete,
       gruposGetProfesores

    }
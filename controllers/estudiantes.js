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


    const estudiantesGetCity = async (req, res=response) => {
      //se puede hacer paginacion igual, pero como era hacerlo lo mas rapido posible.....
         const city = await Estudiante.find().select('city')
        res.json({
          city: city
        });
      }




    const estudiantesGetOne = async (req, res=response) => {
  
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
       const {name} = req.params;
       const {_id, ...resto} = req.body;
       const estudiantebusqueda = await Estudiante.findOne({name:name})

    if(estudiantebusqueda.group != resto.group)

       {

       await quitardegrupo(estudiantebusqueda.name);
       await adicionaragrupo(estudiantebusqueda.name, resto.group);
       }


       const estudiante = await Estudiante.findByIdAndUpdate(estudiantebusqueda.id, resto, {new: true});
       res.json({
        estudiante               
    });
    }
    
    const adicionaragrupo = async (name, grupo) => {
      const grupobusqueda = await Grupos.findOne(
        { _id: ObjectId(grupo)})  
      const estudiantebusqueda = await Estudiante.findOne({name:name})
      grupobusqueda.students.push(estudiantebusqueda._id);  
      grupobusqueda.save();

    }

  
  const estudiantesPost = async (req, res =response) => {
      const {name, age, sex, email, city, group} = req.body;
      const estudiante = new Estudiante({name,age,sex,email,city, group});
      await estudiante.save();     
      adicionaragrupo(name,group);
      res.status(201).json({
        estudiante
      });

    }


 const quitardegrupo = async (name) => {

 const estudiantebusqueda = await Estudiante.findOne({name:name});
  const grupobusqueda = await Grupos.findOne(
    { _id: ObjectId(estudiantebusqueda.group)}) 

     grupobusqueda.students.pull(estudiantebusqueda.id); 
     grupobusqueda.save()
    
 }   
  
  
  const estudianteDelete = async (req, res=response) => {
    const {name} = req.params;
    const estudiante = await Estudiante.findOne({name:name});
    quitardegrupo(name);
    //fisicamente adios normalmente no borro directamente de la BD lo que hago es cambiarle una variable state true o false
     //y de ahi es que hago las consultas a partir de ese valor si esta en true o false
    await Estudiante.findByIdAndDelete(estudiante.id);  
      res.json({        
        msg: 'Estudiante Eliminado y sacado del grupo donde se encontraba',
        // usuarioAutenticado 
      });
    }

  
    module.exports = {
      estudiantesGet,
      estudiantesPut,
      estudiantesGetCity,
      estudiantesPost,
      estudianteDelete,
      estudiantesGetOne

    }
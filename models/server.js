const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor (){
   this.app = express();
   this.port= process.env.PORT;
   this.paths = {
     
       estudiantes: '/api/students',
       grupos: '/api/groups'

   }
    //DB Connect

    this.conectarDB();


   //Middlewares

   this.middlewares();

   //Rutas
   this.routes();

    }

    async conectarDB(){
        await dbConnection();


    }

    middlewares(){
        //CORS

        this.app.use(cors());

        //lectura y parseo del body

        this.app.use(express.json());
    }


    routes (){

        this.app.use(this.paths.estudiantes, require('../routes/estudiantes'));
        this.app.use(this.paths.grupos, require('../routes/grupos'));

          
    }

   listen (){
       
    this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo en puerto', this.port);
    })
   }


}


module.exports = Server;
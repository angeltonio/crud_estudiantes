const mongoose = require ('mongoose');


// DB_CNN  local
// DB_DEP  dev

const dbConnection = async () => {
    try {
   await mongoose.connect(process.env.DB_DEP, {
       useNewUrlParser:true,
       useUnifiedTopology:true,
       useCreateIndex:true,
       useFindAndModify: false,
   })
   console.log('DB Online');


        
    } catch (error) {
        console.log(error);
       throw new Error ('Error a la hora de iniciar la BD') ;
    }

}


module.exports = {
    dbConnection
}
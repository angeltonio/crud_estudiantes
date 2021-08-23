
const {Schema, model} = require ('mongoose');


const GrupoSchema = Schema ({

name: {
    type:String,
    required: [true, 'El nombre es obligatorio']
    },

    profesor: {
        type:String,
        default: ""
    },

    sex: {
        type: String,
        default: ""
    },
    
    email: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    },

    students: [{
        type: Schema.Types.ObjectId, 
        ref: 'Estudiante'
      }, 
      
    ],



});


GrupoSchema.methods.toJSON = function (){
    const {__v, _id,...grupo} = this.toObject();
    grupo.uid = _id;
     return grupo;
}

module.exports = model('Grupo', GrupoSchema);
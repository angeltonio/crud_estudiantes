
const {Schema, model} = require ('mongoose');

const EstudianteSchema = Schema ({

name: {
    type:String,
    required: [true, 'El nombre es obligatorio']
    },

    age: {
        type:Number,
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

    group: {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Grupo',
            required: [true, 'El grupo es obligatorio']
        },
    }
});


EstudianteSchema.methods.toJSON = function (){
    const {__v, _id,...estudiante} = this.toObject();
    estudiante.uid = _id;
     return estudiante;
}

module.exports = model('Estudiante', EstudianteSchema);
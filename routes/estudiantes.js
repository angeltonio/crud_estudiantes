
const {Router} = require('express');
const { check } = require('express-validator');
const { estudiantesPost, estudiantesGet, estudianteDelete, estudiantesPut, estudiantesGetOne, estudiantesGetCity } = require('../controllers/estudiantes');
const {existeNameEstudiante, existeGrupoPorID } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/add',[
    check('name', 'El nombre  es obligatorio').not().isEmpty(),
    check('name').custom(existeNameEstudiante),
    check('email', 'El correo no es válido').isEmail(),
    check('age', 'La edad debe ser un valor númerico').isNumeric(),
    check('sex', 'Debe ser un sexo válido - Masculino o Femenino').isIn(['Masculino', 'Femenino']), 
    check('group', 'No es un id de mongodb valido').isMongoId(),
    check('group').custom(existeGrupoPorID),
    validarCampos

],estudiantesPost ); 

// get all 


router.get('/', estudiantesGet);
router.get('/city', estudiantesGetCity);


//get one by Name

router.get('/:name', [
       
], 
estudiantesGetOne
); 

router.delete('/:name', [
    check('name', 'El nombre  es obligatorio').not().isEmpty(),
    validarCampos
       
], 
estudianteDelete
); 


router.put('/:name', [
    check('name', 'El nombre  es obligatorio').not().isEmpty(),
    validarCampos

       
], 
estudiantesPut
); 















module.exports = router;




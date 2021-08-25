
const {Router} = require('express');
const { check } = require('express-validator');
const { gruposPost, gruposGet, gruposGetOne, gruposGetProfesores, gruposPut, gruposDelete } = require('../controllers/grupos');

const { existeGrupoPorName } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/add',[
    check('name').custom(existeGrupoPorName),
    validarCampos
], gruposPost); 


router.get('/',gruposGet);



router.get('/profesores',gruposGetProfesores);


router.get('/:name',gruposGetOne);

router.delete('/:name', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

  
], gruposDelete);

router.put('/:name', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 
], gruposPut);







module.exports = router;




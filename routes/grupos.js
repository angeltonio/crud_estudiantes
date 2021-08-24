
const {Router} = require('express');
const { check } = require('express-validator');
const { gruposPost, gruposGet } = require('../controllers/grupos');

const { existeGrupoPorName } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/add',[
    check('name').custom(existeGrupoPorName),
    validarCampos
], gruposPost); 


router.get('/', [
 
],gruposGet);

router.delete('/', [
 
], );

router.put('/', [
 
], );







module.exports = router;




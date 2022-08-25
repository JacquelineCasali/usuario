var express = require('express');
var router = express.Router();
var usuarioController=require("../controllers/usuarioController")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('usuario', { title: 'Express' });
// });
// get pegar dados, ou seja leitura 
// post - cadastrar /salvar dados 
// patch/put -atualizar dados
// delete - deletar dados 
router.get( "/",usuarioController.index);
router.get("/:id",usuarioController.show);
router.post("/",usuarioController.store);

router.patch("/:id",usuarioController.update);
router.put("/:id",usuarioController.update);
router.delete("/:id",usuarioController.delete);






module.exports = router;

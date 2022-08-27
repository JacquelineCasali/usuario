var express = require('express');
var router = express.Router();
var usuarioController=require("../controllers/usuarioController")
var meuscreditosController=require("../controllers/meuscreditosController")
var meusenderecosController=require("../controllers/meusenderecosController")
var adicionarenderecoController=require("../controllers/adicionarenderecoController")
var meuscartoesController=require("../controllers/meuscartoesController")
var adicionarcartoesController=require("../controllers/adicionarcartoesController")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('usuario', { title: 'Express' });
// });
// get pegar dados, ou seja leitura 
// post - cadastrar /salvar dados 
// patch/put -atualizar dados
// delete - deletar dados 
router.get( "/",usuarioController.index);
router.get("/meuscreditos",meuscreditosController.index);
router.get("/meuspedidos",meuscreditosController.meuspedidos);
router.get( "/endereco",meusenderecosController.index);
router.get( "/endereco/adicionarendereco",adicionarenderecoController.index);


router.get("/cartoes",meuscartoesController.index);
router.get("/cartoes/adicionarcartoes",adicionarcartoesController.index);

router.get("/:id",usuarioController.show);
router.get("/cartoes/adicionarcartoes/:id",adicionarcartoesController.show);

router.post("/",usuarioController.store);
router.post("/cartoes/adicionarcartoes",adicionarcartoesController.store);

router.patch("/:id",usuarioController.update);
router.patch("/cartoes/adicionarcartoes/:id",adicionarcartoesController.update);


router.put("/:id",usuarioController.update);
router.put("/cartoes/adicionarcartoes/:id",adicionarcartoesController.update);

router.delete("/:id",usuarioController.delete);
router.delete("/cartoes/adicionarcartoes/:id",adicionarcartoesController.delete);








module.exports = router;

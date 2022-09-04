var express = require('express');
var router = express.Router();
var usuarioController=require("../controllers/usuarioController")
var meuscreditosController=require("../controllers/meuscreditosController")
var enderecoController=require("../controllers/enderecoController")
var cartoesController=require("../controllers/cartoesController")
var meuspedidosController=require("../controllers/meuspedidosController")

// get pegar dados, ou seja leitura 
// post - cadastrar /salvar dados 
// patch/put -atualizar dados
// delete - deletar dados 
router.get("/",usuarioController.index);
router.get("/meuscreditos",meuscreditosController.index);
router.get("/meuspedidos",meuspedidosController.meuspedidos);
router.get("/enderecos/",enderecoController.endereco);
router.get("/enderecos/adicionarendereco",enderecoController.index);
router.get("/cartoes",cartoesController.cartoes);
router.get("/cartoes/adicionarcartoes",cartoesController.index);

router.get("/:id",usuarioController.show);
router.get("/cartoes/:id",cartoesController.show);
router.get( "/enderecos/:id",enderecoController.show);
router.get("/meuspedidos/:id",meuspedidosController.show);
router.get("/meuscreditos/:id",meuscreditosController.show);


router.post("/cartoes/adicionarcartoes",cartoesController.create);
router.post("/enderecos/adicionarendereco",enderecoController.create);


router.patch("/:id",usuarioController.update);
router.patch("/cartoes/adicionarcartoes/:id",cartoesController.update);
// router.patch("/enderecos/adicionarendereco/:id",enderecoController.update);



router.put("/:id",usuarioController.update);
router.put("/cartoes/adicionarcartoes/:id",cartoesController.update);
// router.put("/enderecos/adicionarendereco/:id",enderecoController.update);


router.delete("/:id",usuarioController.delete);
router.delete("/cartoes/adicionarcartoes/:id",cartoesController.delete);
// router.delete("/enderecos/adicionarendereco/:id",enderecoController.delete);





module.exports = router;

var express = require('express');
var router = express.Router();
var usuarioController=require("../controllers/usuarioController")
var meuscreditosController=require("../controllers/meuscreditosController")
var enderecoController=require("../controllers/enderecoController")
var cartoesController=require("../controllers/cartoesController")
var meuspedidosController=require("../controllers/meuspedidosController")
var emailController=require("../controllers/emailController")
var senhaController=require("../controllers/senhaController")
var pedidosController=require("../controllers/pedidosController")
const crypto=require("crypto")
const multer=require ("multer");

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,__dirname+"/../../uploads/") 
     },
     filename:(req,file,cd)=>{
        const extension=file.originalname.split(".")[1]
    const newName=crypto.randomBytes(5).toString("hex");
    console.log(file)
    cd(null, `${newName}.${extension}`);
     }
});

const upload=multer({storage})
// get pegar dados, ou seja leitura 
// post - cadastrar /salvar dados 
// patch/put -atualizar dados
// delete - deletar dados 


// criar 
router.get("/enderecos/adicionarendereco",enderecoController.create);
router.post('/enderecos/adicionarendereco',upload.single("avatar"),enderecoController.store)


router.get("/cartoes/adicionarcartoes",cartoesController.create);
router.post("/cartoes/adicionarcartoes", upload.single("avatar"),cartoesController.store);

// editar
// router.patch("/:id",usuarioController.update);
// router.put("/:id",usuarioController.update);

router.get("/editaremail/:id",emailController.edit);
router.put("/editaremail/:id",emailController.update);
router.patch("/editaremail/:id",emailController.update);


router.get("/editarsenha/:id",senhaController.edit);
router.put("/editarsenha/:id",senhaController.update);
router.patch("/editarsenha/:id",senhaController.update);

router.get("/enderecos/editarendereco/:id",enderecoController.edit);
router.put("/enderecos/editarendereco/:id",enderecoController.update);
router.patch("/enderecos/editarendereco/:id",enderecoController.update);

router.get("/cartoes/editarcartoes/:id",cartoesController.edit);
router.put("/cartoes/editarcartoes/:id",upload.single("avatar"),cartoesController.update);
router.patch("/cartoes/editarcartoes/:id",upload.single("avatar"),cartoesController.update);

// deletar
router.get("/enderecos/deletarenderecos/:id",enderecoController.delete);
router.delete("/enderecos/deletarenderecos/:id",enderecoController.destroy);

router.get("/cartoes/deletarcartao/:id",cartoesController.delete);
router.delete("/cartoes/deletarcartao/:id",cartoesController.destroy);

// router.delete("/:id",usuarioController.delete);

router.get("/",usuarioController.index);
router.get("/meuspedidos",meuspedidosController.index);
router.get("/meuscreditos",meuscreditosController.index);

router.get("/enderecos/",enderecoController.endereco);
router.get("/enderecos/adicionarendereco",enderecoController.index);
router.get("/cartoes",cartoesController.cartoes);
router.get("/cartoes/adicionarcartoes",cartoesController.index);

// :id
router.get("/:id",usuarioController.show);
router.get("/meuspedidos/:id",meuspedidosController.show);
router.get("/meuspedidos/pedidos/:id",pedidosController.show);

router.get("/meuscreditos/:id",meuscreditosController.show);
router.get("/enderecos/:id",enderecoController.show);
router.get("/cartoes/:id",cartoesController.show);




module.exports = router;

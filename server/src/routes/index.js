var express = require('express');
var router = express.Router();
var userController=require("../controllers/UserController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get( "/usuario",userController.usuario)
router.get("/finalizacao",userController.finalizacao)
router.get("/sucesso",userController.sucesso)
router.get("/home",userController.home)

module.exports = router;

var express = require('express');
var router = express.Router();
var adicionarcartoesController=require("../controllers/adicionarcartoesController")

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('adicionarcartoes', { title: 'Express' });
//   });
router.get( "/",adicionarcartoesController.index)

router.get("/:id",adicionarcartoesController.show);
router.post("/",adicionarcartoesController.store);

router.patch("/:id",adicionarcartoesController.update);
router.put("/:id",adicionarcartoesController.update);
router.delete("/:id",adicionarcartoesController.delete);



module.exports = router;

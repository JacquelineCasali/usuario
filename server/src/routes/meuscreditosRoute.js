var express = require('express');
var router = express.Router();
var meuscreditosController=require("../controllers/meuscreditosController")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('meuscreditos', { title: 'Express' });
  });
router.get( "/meuscreditos",meuscreditosController.meuscreditos)


module.exports = router;


var express = require('express');
var path = require('path');
var port=3000;
var methodOverride=require("method-override");
var cookieParser = require('cookie-parser');
var session=require("express-session")
var logger = require('morgan');


var usuarioRoute = require('./server/src/routes/usuarioRoute');
var imageRoute=require("./server/src/routes/imageRoute")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"senha"}));


app.use(express.static(path.join(__dirname, 'server/public')));

app.use((req,res,next)=>{
  console.log("entrou no middleware");
  console.log(req.url);
  next();
})



app.use('/MinhaConta', usuarioRoute);

app.use("/images",imageRoute)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// pagina nao encontrada
app.use((req,res,next)=>{
  res.status(404).render("error",{
      title:"|Ops",
      message:"Pagina não encontrada"
  });
  });

  app.get("*",(req, res,next)=>{
    res.status(404).render("error",{
      title:"|Ops",
      message:"Pagina não encontrada"
  });
  });
  

module.exports = app;
app.listen(port, () => {
  console.log("Estamos rodando em: http://localhost:" + port + "/MinhaConta/1");
});

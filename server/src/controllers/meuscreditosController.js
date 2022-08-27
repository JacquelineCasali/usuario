// var creditos=require("../data/creditos.json")
// creditos=creditos.data;
const meuscreditosController={

    index:(req,res)=>{
        return res.render("meuscreditos");
         
    },

    meuspedidos:(req,res)=>{
        return res.render("meuspedidos");
         
    },
}

 module.exports=meuscreditosController;
 


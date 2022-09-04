var users=require("../data/users.json");
users=users.usuarios;
const meuspedidosController={


    meuspedidos:(req,res)=>{
        return res.render("meuspedidos",{title:"Meus Pedidos",users});
         
    },

 
show:(req,res)=>{
    const {id}=req.params;
    const userResult=users.find(user=>user.id===parseInt(id));
    if(!userResult){
        return res 
        .render("Pedido não entcontrado")
     }
        return res 
   
        .render("meuspedidos",{title:"Visualizar Pedidos",
        user:userResult} )
},


}
    
  





 module.exports=meuspedidosController;
 


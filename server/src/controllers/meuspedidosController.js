var users=require("../data/users.json");
users=users.usuarios;

const meuspedidosController={


    meuspedidos:(req,res)=>{
        return res.render("meuspedidos",{title:"Meus Pedidos",users});
         
    },

 
// show:(req,res)=>{
//     const { id } = req.params;
//     const userResult = users.find((user) => user.id === parseInt(id));
//     if (!userResult) {
//       return res.render("error", {
//         title: "Ops!",
//         message: "Nenhum pedido encontrado",
//       });
//     }
//     return res.render("meuspedidos", { title: "Meus pedidos", user: userResult });
//   },
// }



    
}





 module.exports=meuspedidosController;
 


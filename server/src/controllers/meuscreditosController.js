const files=require("../helpers/files")


var users=require("../data/users.json");
users=users.usuarios;
const meuscreditosController={

    index:(req,res)=>{
    return res.render("meuscreditos",{title:"Meus Créditos",users});
         
    },


 


show:(req,res)=>{
    const { id }= req.params
    const userResult=users.find((user)=>{
       return user.id === parseInt(id);
     })

     if(!userResult){
        return res 
        .send("Meus Creditos não entcontrado")
     }

     const user ={
        ...userResult,
        avatar:files.base64Encode(__dirname + "/../../uploads/" + userResult.avatar),
      }


     
        return res 
        .render("meuscreditos",{title:"Visualizar Pedidos",
        user} )
},


}
    
  

 module.exports=meuscreditosController;
 


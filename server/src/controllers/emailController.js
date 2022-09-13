const files=require("../helpers/files")
const upload = require("../config/upload");
var users=require("../data/users.json");
users=users.usuarios;
const emailController={

// show:(req,res)=>{
//     const {id}=req.params;
//     const userResult=users.find(user=>user.id===parseInt(id));
//     if(!userResult){
//         return res 
//         .render("Email não entcontrado")
//      }
//         return res 
   
//         .render("editaremail",{title:"Editar Email",
//         user:userResult} )
// },
edit:(req,res)=>{
    const {id} = req.params;
    const userResult = users.find((user) => user.id === parseInt(id))
    if (!userResult){
        return res.render("error", {
            title: "Ops!",
            message: "Nenhum Email encontrado",
          });
        }
        const user ={
          ...userResult,
          avatar:files.base64Encode(upload.path + userResult.avatar),
        }  

   
    return res.render("editaremail", {
        title: "Editar Email",
        user
      });
    },
    
    
    // update-atualizar um endereco
        update:(req,res)=>{
        const {id}= req.params
        const {email, novoEmail,confirmaçãoEmail}=req.body;
        const userResult= users.find((user)=>
        user.id===parseInt(id));
        if (!userResult){
            return res.render("error", {
                title: "Ops!",
                message: "Nenhum E-mail encontrado",
              });
            }

         
            
    const updateUser=userResult;
    if(email) updateUser.email=email;
    if(novoEmail) updateUser.novoEmail=novoEmail;
    if(confirmaçãoEmail) updateUser.confirmaçãoEmail=confirmaçãoEmail;
    return res.render("success", {
        title: "Email atualizado",
        message: `Email ${updateUser.email} atualizado com sucesso`,
      });
    },
    






}
    
  





 module.exports=emailController;
 


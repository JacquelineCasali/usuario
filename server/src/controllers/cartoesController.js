const fs=require("fs")
const files=require("../helpers/files");
const upload = require("../config/upload");
var users=require("../data/users.json");
users=users.usuarios;
const cartoesController={
    cartoes:(req,res)=>{
    return res.render("cartoes",{title:"Meus Cartões",users});
         
 },

index:(req,res)=>{
    return res.render("adicionarcartoes",{title:"Adicionar Cartoes",users});
     
},

show:(req,res)=>{ 
   const { id }= req.params
  const userResult=users.find((user)=>{
  return user.id === parseInt(id);
     })

if(!userResult){
return res 
 .render("cartoes",{
    title: "Ops!",
    message: "Nenhum Cartão encontrado",
  });
 
     }
     const user ={
        ...userResult,
        avatar:files.base64Encode(upload.path + userResult.avatar),
      }

     return res 
    .render("cartoes",{title:"Visualizar Cartões",
     user} )
     
    
    
},

create:(req,res)=>{
return res.render("adicionarcartoes",{title:"Cadastrar Cartão"})
    },

// CREATE - Criar um cartao

store:(req,res)=>{ 
  const {nome, cpf,telefonePrincipal, cvc,cartao}=req.body;
  let filename="user-default.jpeg";
  if(req.file){
    filename=req.file.filename;
  }
  // para validação
  // ! é negação 
  //  condicional ou
  if(!nome|| !cpf || telefonePrincipal ||!cvc ||!cartao){
      return res.render ("adicionarcartoes",{
          title:"Cadastrar Cartões",
          error:{
          message:"Preencha todos os campos!",}
  
      })
  }
  const newUser = {
      id:users.length + 1,
      nome,
      cpf, 
      telefonePrincipal, 
       cvc, 
      cartao ,
      avatar: filename,

  }
  users.push(newUser)
  // length pega a quantidade de usuarios e soma 1
  
     return res.render("Success",{
      title:"Cartão Cadastrado",
      message:"Cartão Cadastrado com Sucesso",
  })

  },

// editar
edit:(req,res)=>{
const {id}=req.params;
const userResult=users.find((user)=>user.id===parseInt(id));
if(!userResult){
    return res.render ("error",{
        title:"Ops!",
        message:"Nenhum Cartão encontrado",
    });
}
const user ={
  ...userResult,
  avatar:files.base64Encode(upload.path + userResult.avatar),
}  


return res.render("editarcartoes",{
    title: "Editar Cartão",
    user,
})
},


// update-atualizar um usuario
    update:(req,res)=>{
      const {id}= req.params
    const {nome, cpf,telefonePrincipal, cvc,cartao
    }=req.body;
    const userResult= users.find((user)=>
    user.id===parseInt(id));
    let filename;
    if(req.file){
      filename=req.file.filename;
    }
    if(!userResult){
    return res.render ("error",{
     title:"Ops!",
     message:"Nenhum Cartão encontrado",
        });

    }
const updateUser=userResult;
if(nome) updateUser.nome=nome;
if(cpf) updateUser.cpf=cpf;
if(telefonePrincipal) updateUser.telefonePrincipal=telefonePrincipal;
if(cvc) updateUser.cvc=cvc;
if(cartao) updateUser.cartao=cartao;
if(filename) 
{
  let avatarTmp = updateUser.avatar;
  fs.unlinkSync(upload.path +  avatarTmp);
    updateUser.avatar=filename;
}
return res.render("success", {
    title: "Cartão atualizado",
    message: `Cartão ${updateUser.nome} atualizado com sucesso`,
  });    
},
// delete - deletar um cartão

// delete - deletar um usuario
delete:(req,res)=>{ 
    const {id} = req.params;
    const userResult = users.find((user) => user.id === parseInt(id))
    if (!userResult){
        return res.render("error", {
            title: "Ops!",
            message: "Nenhum Cartão encontrado",
          });
            
    }

    const user={
      ...userResult,
      avatar:files.base64Encode(upload.path + userResult.avatar),
    }
    return res.render("deletarcartao", {
        title: "Deletar Cartão",
        user
      });
    },
     

    destroy:(req,res)=>{
    const { id } = req.params;
    const result =users.findIndex((user)=>user.id===parseInt(id))
if(result === -1){
  

    return res.render("cartão", {
        title: "Ops!",
        message: "Nenhum Cartão Cadastrado",
      });
}

fs.unlinkSync(upload.path + users[result].avatar);

users.splice(result,1)

return res.render("success",{
  title:"Usuário deletado",
  message: "Cartão deletado com sucesso!"
})
},

// salvarCadastro:(req,res)=>{
//     if(!req.file)
//     console.log(req.file);
//     return res.send("deu certo")
//   }
    }






module.exports=cartoesController;
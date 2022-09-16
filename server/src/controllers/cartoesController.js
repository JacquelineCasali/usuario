const fs=require("fs")
const path=require("path")
const files=require("../helpers/files");
const uploads = require("../config/uploads");
// var users=require("../data/users.json");
// users=users.usuarios;

const userJson=fs.readFileSync(

  path.join(__dirname,"..","data","users.json"),
  "utf-8"
)
const users=JSON.parse(userJson);


const cartoesController={
    cartoes:(req,res)=>{
    return res.render("cartoes",{title:"Meus Cartões"});
         
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
        avatar:files.base64Encode(uploads.path + userResult.avatar),
      }

     return res 
    .render("cartoes",{title:"Visualizar Cartões",
     user} )
     
       
},

adicionarcartoes:(req,res)=>{
  return res.render("adicionarcartoes",{title:"Adicionar Cartoes"});
   
},

create:(req,res)=>{
  const {nome, cpf,telefonePrincipal, cvc,cartao}=req.body;
  let filename="user-default.jpeg";
  if(req.file){
    filename=req.file.filename;
  }
  // para validação
  // ! é negação 
  //  condicional ou
  if(!nome||
     !cpf || 
     telefonePrincipal ||
     !cvc||
     !cartao
     ){
      return res.render ("adicionarcartoes",{
          title:"Cadastrar Cartões",
          error:{
          message:"Preencha todos os campos!",}
  
      })
  }

    const newUser = {
      nome,
      cpf, 
      telefonePrincipal, 
       cvc, 
      cartao ,
      avatar: filename,
     

  }
  const newId=users[users.length -1].id +1;
  newUser.criadoEm=new Date(),
  newUser.modificadoEm=new Date(),
  newUser.admin=false;
  newUser.id=newId
  users.push(newUser)

  fs.writeFileSync(
 path.join(__dirname,"..","data","users.json"),
JSON.stringify(users)
  )
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
  avatar:files.base64Encode(uploads.path + userResult.avatar),
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
  fs.unlinkSync(uploads.path +  avatarTmp);
    updateUser.avatar=filename;
}

fs.writeFileSync(
  path.join(__dirname,"..","data","users.json"),
  // conteudo que sera salvo no arquivo
  JSON.stringify(users)
  );
  
  
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
      avatar:files.base64Encode(uploads.path + userResult.avatar),
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

// fs.unlinkSync(upload.path + users[result].avatar);

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
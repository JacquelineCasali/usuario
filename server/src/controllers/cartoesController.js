
const Sequelize= require("sequelize");
const configDB=require("../config/database");
const db=new Sequelize(configDB);
const cartoes=require("../models/cartoes");


const fs=require("fs")
const path=require("path")
const files=require("../helpers/files");
const upload = require("../config/upload");
const bcrypt=require("../helpers/bcrypt");


const cartoesController={
 show:async (req,res)=>{ 
  const { id }= req.params
  try{
      const userResult= await db.query("SELECT * FROM  cartoes WHERE id= :id",{
    replacements:{
      id:id
    },
    type:Sequelize.QueryTypes.SELECT,
  })
  
  console.log(userResult)
  if(userResult.length===0){
    throw Error ("Nenhum Cartão encontrado")
  }
  return res.render("cartoes", { title: "Cartões", user:userResult[0] });
    }catch(error){
      console.log(error);
          res.render("error",{title:"Ops!",message: "Nenhum cartão encontrado",
  
      })
      
    }


},
    


adicionarcartoes:(req,res)=>{
  return res.render("adicionarcartoes",{title:"Adicionar Cartoes"});
   
},

create: async(req,res)=>{
   const {nome,numero, cvc, data, cpf, telefone}=req.body;
  try{
    
    const users= await cartoes.create({
      nome,
      numero, 
      cvc:bcrypt.generateHash(cvc), 
      data,
      cpf,
     telefone,
    });
      res.status(201).json({message:"Cartão Cadastrado com Sucesso"})
        
    }catch(error){
      console.log(error);
     return res.render("error",
    {title:"Ops!",message: "Error ao criar Cartão",
       })
   }
        },

  


  auth:(req,res)=>{
    const usersJson=fs.readFileSync(
      path.join(__dirname,"..","data","users.json"),
      "utf-8"
  );
  
  const users=JSON.parse(usersJson)
  const {cvc}=req.body;
  const userAuth = users.find(user=>{
    if(bcrypt.compareHash(cvc,user.cvc)){
      return true;
    }
  })

if(!userAuth){
  return res.render ("adicionarcartoes",{
    title:"Adicionar Cartão",
    error:{
      message:"Cvc Invalido"
    }
  })
}


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
// if(cvc) updateUser.cvc=cvc.bcrypt.generateHash(cvc);

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
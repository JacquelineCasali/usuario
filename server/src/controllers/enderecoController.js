const files=require("../helpers/files")
var users=require("../data/users.json");
users=users.usuarios;


const enderecoController={
    endereco:(req,res)=>{
        return res.render("enderecos",{title:"Endereço",users});
    },
    
    index:(req,res)=>{
        return res
        .status(200)
        .render("adicionarendereco",{title:"Adicionar Endereço",users});
        
},

// read - ler apenas um usuario
show:(req,res)=>{ 
    const { id }= req.params
    const userResult=users.find((user)=>{
       return user.id === parseInt(id);
     })

     if(!userResult){
        return res.render("enderecos", {
            title: "Ops!",
            message: "Nenhum Endereço encontrado",
          });
        }
        const user ={
  ...userResult,
   avatar:files.base64Encode(__dirname + "/../../uploads/" + userResult.avatar),
          }

    return res 
    .status(400)
    .render("enderecos",{title:"Visualizar Endereço",
    user} )
    
},

create:(req,res)=>{

return res.render("adicionarendereco",{title:"Cadastrar Endereço"})

},



// CREATE - Criar um endereço
    store:(req,res)=>{ 
    const {nome, cep,rua, bairro, cidade,numero,complemento}=req.body;
    
    let filename="user-default.jpeg";
    if(req.file){
      filename=req.file.filename;
    }
    // para validação
    // ! é negação 
    //  condicional ou
    if(!nome|| !cep|| !rua|| !bairro|| ! cidade|| !numero|| complemento ){
      return res.render ("adicionarendereco",{
            title:"Cadastrar Endereço",
            error:{
            message:"Preencha todos os campos!",}
    
        })
    }
    
    const newUser={
        id:users.length + 1,
        nome, 
        cep,
        rua, 
        bairro, 
        cidade,
        numero,
        complemento,
        avatar:filename,
    }
    users.push(newUser)
           return res.render("Success",{
            title:"Endereço criado",
            message:"Endereço Criado com Sucesso",
        })   


        
},
edit:(req,res)=>{
const {id} = req.params;
const userResult = users.find((user) => user.id === parseInt(id))
if (!userResult){
    return res.render("error", {
        title: "Ops!",
        message: "Nenhum Endereço encontrado",
      });
    }
      const user ={
        ...userResult,
        avatar:files.base64Encode(__dirname + "/../../uploads/" + userResult.avatar),
      }  


return res.render("editarendereco", {
    title: "Editar Endereço",
    user
  });
},


// update-atualizar um endereco
    update:(req,res)=>{
    const {id}= req.params
    const {nome, cep,rua, bairro, cidade,numero,complemento}=req.body;
    const userResult= users.find((users)=>
    users.id===parseInt(id));
    if (!userResult){
        return res.render("error", {
            title: "Ops!",
            message: "Nenhum Endereço encontrado",
          });
        }

        
const newUser=userResult;
if(nome) newUser.nome=nome;
if(cep) newUser.cep=cep;
if(rua) newUser.rua=rua;
if(bairro) newUser.bairro=bairro;
if(cidade) newUser.cidade=cidade;
if(numero) newUser.numero=numero;
if(complemento) newUser.complemento=complemento;
return res.render("success", {
    title: "Endereço atualizado",
    message: `Endereço do usuário ${newUser.nome} atualizado com sucesso`,
  });
},
// delete - deletar um usuario
delete:(req,res)=>{ 
        const {id} = req.params;
        const userResult = users.find((user) => user.id === parseInt(id))
        if (!userResult){
            return res.render("error", {
                title: "Ops!",
                message: "Nenhum Endereço encontrado",
              });
                
        }
        const user ={
            ...userResult,
            avatar:files.base64Encode(__dirname + "/../../uploads/" + userResult.avatar),
          }
        return res.render("deletarenderecos", {
            title: "Deletar Endereço",
            user
          });
        },
         

        destroy:(req,res)=>{
const {id}=req.params;
const userResult =users.findIndex((user)=>user.id===parseInt(id))
if(userResult === -1){
    return res.render("error", {
        title: "Ops!",
        message: "Nenhum Endereço Cadastrado",
      });
}  




users.splice(userResult,1)
return res.render("success",{
    title:"Endereço deletado",
    message: "Endereço deletado com sucesso!"
  })

},
}








module.exports=enderecoController;







var users=require("../data/users.json");
users=users.usuarios;





const usuarioController={
// read - ler / listar todos os usuarios pode filtrar eles
    index:(req,res)=>{
        // return 
        
        return res
           .render("usuarios",{title:"Minha Conta",users});
    },

// CRUD
// CREATE - Criar 
// read - ler 
// update-atualizar
// delete - deletar
// read - ler / listar todos os usuarios pode filtrar eles


// read - ler apenas um usuario
show:(req,res)=>{ 
    const { id }= req.params;
    const userResult=users.find((user)=>user.id === parseInt(id));
    

     if(!userResult){
        return res
         // mensagem de erro
        .status(400) 
           
        .render("Nenhum Usuário Encontrado")
             
          }
    return res 
    .status(200)
    .render("usuarios",{title:"Visualizar Usuário",user:userResult})
    
    
    
},

// CREATE - Criar um usuario
//     create:(req,res)=>{ 
//     const {nome, cpf,telefonePrincipal, rg, celular,email,novoEmail,confirmaçãoEmail
//     }=req.body;
//     // para validação
//     // ! é negação 
//     //  condicional ou
//     if(!nome|| !cpf ||!email ||!telefonePrincipal ||!rg || !celular ||!email ||!novoEmail ||!confirmaçãoEmail){
//     return res.status(404)
//     .json({message:"Preencha todos os campos"})
//     }
//     users.push({
//     // length pega a quantidade de usuarios e soma 1
//     id:users.length + 1,
//     Completo,
//     CPF,
//     telefonePrincipal,
//     RG,
//     celular,
//     email,novoEmail,ConfirmaçãoNovoEmail
//     })
//      res.status(201).json({Messange: "Usúario Criado com Sucesso"});
// },
// update-atualizar um usuario
    update:(req,res)=>{
    const {id}= req.params
    const {nome, cpf,telefonePrincipal, rg, celular,email,novoEmail,confirmaçãoEmail}=req.body;
    const result= users.find((users)=>
    users.id===parseInt(id));
    if(!result){
        return res
        .status(400)
        .json({message:"Nenhum usuário encontrado"})
    }
const newUser=result;
if(nome) newUser.nome=nome;
if(cpf) newUser.cpf=cpf;
if(telefonePrincipal) newUser.telefonePrincipal=telefonePrincipal;
if(rg) newUser.rg=rg;
if(celular) newUser.celular=celular;
if(email) newUser.email=email;
if(novoEmail) newUser.novoEmail=novoEmail;
if(confirmaçãoEmail) newUser.confirmaçãoEmail=confirmaçãoEmail;
return res.status(200).json({message:"Atualização realizada com sucesso"})
    
},
// delete - deletar um usuario
delete:(req,res)=>{ 
    const {id}= req.params;
    const result= users.findIndex((users)=>
    users.id===parseInt(id));
    if(result===-1){
        return res
        .status(400)
        .json({message:"Nenhum usuário encontrado"})
    }
users.splice(result,1);
return res
.status(200)
.json({message:"Usuario deletado com sucesso"})
},
save:(req,res)=>{
    const {id,name}= req.params;
    if(name){
        res.send(`Save ${id} e ${name}`);
    } else{
        res.send(`Save ${id}`);
    }
    }
};





module.exports=usuarioController;
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
        .render("Cartão não entcontrado")
     }
        return res 
   
        .render("cartoes",{title:"Visualizar Cartão",
        user:userResult} )
    
    
},

create:(req,res)=>{

    return res.render("adicionarcartoes",{title:"Cadastrar Cartão"})
    
    },

// CREATE - Criar um usuario
store:(req,res)=>{ 
    const {nome, cpf,telefonePrincipal, cvc,cartao}=req.body;
    // para validação
    // ! é negação 
    //  condicional ou
    if(!nome|| !cpf ||!telefonePrincipal ||!cvc ||!cartao){
        return res.render ("adicionarcartoes",{
            title:"Cadastrar Cartões",
            error:{
            message:"Preencha todos os campos!",}
    
        })
    }
    users.push({
    // length pega a quantidade de usuarios e soma 1
    id:users.length + 1,
    nome, cpf, telefonePrincipal,  cvc,  cartao  
     })
    
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
return res.render("editarcartoes",{
    title: "Editar Cartão",
    user:userResult,
})
},


// update-atualizar um usuario
    update:(req,res)=>{
    const {id}= req.params
    const {nome, cpf,telefonePrincipal, cvc,cartao
    }=req.body;
    const result= users.find((users)=>
    users.id===parseInt(id));
    if(!result){
        return res
        .status(400)
        .json({message:"Nenhum Cartão Encontrado"})
    }
const newUser=result;
if(nome) newUser.nome=nome;
if(cpf) newUser.cpf=cpf;
if(telefonePrincipal) newUser.telefonePrincipal=telefonePrincipal;
if(cvc) newUser.cvc=cvc;
if(cartao) newUser.cartao=cartao;
return res.render("success", {
    title: "Cartão atualizado",
    message: `Cartão ${newUser.nome} atualizado com sucesso`,
  });    
},
// delete - deletar um usuario
delete:(req,res)=>{ 
    const {id}= req.params;
    const result= users.findIndex((users)=>
    users.id===parseInt(id));
    if(result===-1){
        return res
        .status(400)
        .json({message:"Nenhum Cartão Encontrado"})
    }
users.splice(result,1);
return res
.status(200)
.json({message:"Cartão Deletado Com Sucesso"})
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






module.exports=cartoesController;
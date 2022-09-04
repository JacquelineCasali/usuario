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
// CREATE - Criar um usuario
    create:(req,res)=>{ 
    const {nomeCompleto, CPF,telefonePrincipal, RG, celular,email,novoEmail,ConfirmaçãoNovoEmail
    }=req.body;
    // para validação
    // ! é negação 
    //  condicional ou
    if(!nomeCompleto|| !CPF ||!email ||!novoEmail ||!ConfirmaçãoNovoEmail){
    return res.status(404)
    .json({message:"Preencha Todos Os Campos"})
    }
    users.push({
    // length pega a quantidade de usuarios e soma 1
    id:users.length + 1,
    nomeCompleto,
    CPF,
    telefonePrincipal,
    RG,
    celular,
    email,novoEmail,ConfirmaçãoNovoEmail
    })
     res.status(201).json({Messange: "Cartão Criado Com Sucesso"});
},
// update-atualizar um usuario
    update:(req,res)=>{
    const {id}= req.params
    const {nomeCompleto, CPF,telefonePrincipal, RG, celular,email,novoEmail,ConfirmaçãoNovoEmail
    }=req.body;
    const result= users.find((users)=>
    users.id===parseInt(id));
    if(!result){
        return res
        .status(400)
        .json({message:"Nenhum Cartão Encontrado"})
    }
const newUser=result;
if(nomeCompleto) newUser.nomeCompleto=nomeCompleto;
if(CPF) newUser.CPF=CPF;
if(telefonePrincipal) newUser.telefonePrincipal=telefonePrincipal;
if(RG) newUser.RG=RG;
if(celular) newUser.celular=celular;
if(email) newUser.email=email;
if(novoEmail) newUser.novoEmail=novoEmail;
if(ConfirmaçãoNovoEmail) newUser.ConfirmaçãoNovoEmail=ConfirmaçãoNovoEmail;
return res.status(200).json({message:"Atualização Realizada Com Sucesso"})
    
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
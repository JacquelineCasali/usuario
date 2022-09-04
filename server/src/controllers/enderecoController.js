var users=require("../data/users.json");
users=users.usuarios;

// const enderecos=[
//     {
//         id: 1,
//         nomeCompleto:"Roberto Silva",
//         cep:"45897654",
//         Rua:" Manoel Dias da Silva",
//         Bairro: "Pojuca",
//         Cidade:"Monte Verde",
//         Numero:"500",
//     Complemento:"MG",
//     avatar: "https://i.pravatar.cc/300?img=70"
//     },

//       {
//         id: 2,
//         nomeCompleto: "Ana Couto",
//         avatar: "https://i.pravatar.cc/300?img=49",
//         cep:"45897654",
//         Rua:" Dias da Silva",
//         Bairro: "Piripiri",
//         Cidade:"Verde",
//         Numero:"S/N",
//         Complemento:"MG"
           
//       },

//       {
//         id: 3,
//         nomeCompleto: "Ana Couto",
//         avatar: "https://i.pravatar.cc/300?img=48",
//         cep:"45897654",
//         Rua:" Dias da Silva",
//         Bairro: "Piripiri",
//         Cidade:"Verde",
//         Numero:"S/N",
//         Complemento:"BA"
           
//       },

//     ]
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
        return res 
        .send("Endereço não entcontrado")
             
    }
    return res 
    .status(400)
    .render("enderecos",{title:"Visualizar Endereço",
    user:userResult} )
    
},
// create = store
create:(req,res)=>{ 

    return res.render("adicionarendereco",{title:"Adicionar endereço"});

},
        
}



module.exports=enderecoController;







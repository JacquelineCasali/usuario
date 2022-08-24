var users=require("../data/users.json");
users=users.data;
const usuarioController={
// read - ler / listar todos os usuarios pode filtrar eles
    index:(req,res)=>{
        // return 
       return res
       .status(200)
       .render("usuario");

    },

// CRUD
// CREATE - Criar 
// read - ler 
// update-atualizar
// delete - deletar
// read - ler / listar todos os usuarios pode filtrar eles
// index:(req,res)=>{
//     return res
//     .status(200)
//     .json({data:users})
    
// },

// read - ler apenas um usuario
show:(req,res)=>{ 
    const { id }= req.params
    const result=users.find((user)=>{
       return user.id === parseInt(id);
     })

     if(!result){
        return res
        // .status(400) mensagem de erro
        .status(400)
        .json({message:"Nenhum usuário encontrado"})
    }
    return res .status(200)
    .json({data:result, message:"Usuario encontrado"})
    
    
},
// CREATE - Criar um usuario
store:(req,res)=>{ 
    console.log("store")
    const {nomeCompleto, CPF,
        RG,
        telefonePrincipal,
        celular,
    email}=req.body;
    // para validação
    // ! é negação 
    if(!nomeCompleto){
   console.log("as")
        return res.send(404)
    }
    
    users.push({
    // length pega a quantidade de usuarios e soma 1
    id:users.length + 1,
    nomeCompleto,
    CPF,
    RG,
    telefonePrincipal,
    celular,
email})

    
    res.status(201).json({Messange: "Usúario Criado com sucesso"});
},
// update-atualizar um usuario
update:(req,res)=>{
    const {id}= req.params
    res.send(`update ${id}`);
},
// delete - deletar um usuario
delete:(req,res)=>{ 
    const {id}= req.params
res.send(`delete ${id}`);
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



// deletarUsuario:(req,res)=>{
//     const {id} = req.params;
//     res.send("Deletando Usuario com id: " +id)
// }


module.exports=usuarioController;
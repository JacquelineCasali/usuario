var users=require("../data/users.json");
users=users.data;
const adicionarenderecoController={
    index:(req,res)=>{
        return res
        .status(200)
        .render("adicionarendereco");
        
},

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
    const {nomeDoDestinatário, cep,rua, bairro, Cidade,numero,complemento}=req.body;
    // para validação
    // ! é negação 
    //  condicional ou
    if(!nomeDoDestinatário|| !cep|| !rua|| !bairro|| ! Cidade|| !numero|| !complemento ){
    return res.status(404)
    .json({message:"Preencha todos os campos"})
    }
    users.push({
    // length pega a quantidade de usuarios e soma 1
    id:users.length + 1,
    nomeDoDestinatário, cep,rua, bairro, Cidade,numero,complemento 
        })
     res.status(201).json({Messange: "Usúario Criado com Sucesso"});
},
// update-atualizar um usuario
    update:(req,res)=>{
    const {id}= req.params
    const {nomeDoDestinatário, cep,rua, bairro, Cidade,numero,complemento}=req.body;
    const result= users.find((users)=>
    users.id===parseInt(id));
    if(!result){
        return res
        .status(400)
        .json({message:"Nenhum endereço encontrado"})
    }
const newUser=result;
if(nomeDoDestinatário) newUser.nomeDoDestinatário=nomeDoDestinatário;
if(cep) newUser.cep=cep;
if(rua) newUser.rua=rua;
if(bairro) newUser.bairro=bairro;
if(Cidade) newUser.Cidade=Cidade;
if(numero) newUser.numero=numero;
if(complemento) newUser.complemento=complemento;
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
        .json({message:"Nenhum Endereço Encontrado"})
    }
users.splice(result,1);
return res
.status(200)
.json({message:"Endereço Deletado Com Sucesso"})
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





module.exports=adicionarenderecoController;







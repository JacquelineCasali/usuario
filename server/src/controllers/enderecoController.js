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
        return res 
        .send("Endereço não entcontrado")
             
    }
    return res 
    .status(400)
    .render("enderecos",{title:"Visualizar Endereço",
    user:userResult} )
    

},

create:(req,res)=>{

return res.render("adicionarendereco",{title:"Cadastrar Endereço"})

},



// CREATE - Criar um endereço
    store:(req,res)=>{ 
    const {nome, cep,rua, bairro, cidade,numero,complemento}=req.body;
    // para validação
    // ! é negação 
    //  condicional ou
    if(!nome|| !cep|| !rua|| !bairro|| ! cidade|| !numero|| !complemento ){
        return res.render ("adicionarendereco",{
            title:"Cadastrar Endereço",
            error:{
            message:"Preencha todos os campos!",}
    
        })
    }
    const newUser={
        id:users.length + 1,
        nome, cep,rua, bairro, cidade,numero,complemento
    }
    users.push({
        nome, 
        cep,
        rua, 
        bairro, 
        cidade,
        numero,
        complemento,

    });
           return res.render("Success",{
            title:"Endereço criado",
            message:"Endereço Criado com Sucesso",
        })   
},
// update-atualizar um usuario
    update:(req,res)=>{
    const {id}= req.params
    const {nome, cep,rua, bairro, cidade,numero,complemento}=req.body;
    const result= users.find((users)=>
    users.id===parseInt(id));
    if(!result){
        return res
        .status(400)
        .json({message:"Nenhum Endereço Encontrado"})
    }
const newUser=result;
if(nome) newUser.nome=nome;
if(cep) newUser.cep=cep;
if(rua) newUser.rua=rua;
if(bairro) newUser.bairro=bairro;
if(cidade) newUser.cidade=cidade;
if(numero) newUser.numero=numero;
if(complemento) newUser.complemento=complemento;
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








module.exports=enderecoController;







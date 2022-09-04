// const enderecos=[
//     {
//         id: 1,
//         nomeCompleto:"Roberto Silva",
//         cep:"45897654",
//         Rua:" Manoel Dias da Silva",
//         Bairro: "Pojuca",
//         Cidade:"Monte Verde",
//         Numero:"500",
//     Complemento:"",
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
//         Complemento:"45"
           
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
//         Complemento:"45"
           
//       },
//       {
//         id: 4,
//         nomeCompleto: "Ana Couto",
//         avatar: "https://i.pravatar.cc/300?img=48",
//         cep:"45897654",
//         Rua:" Dias da Silva",
//         Bairro: "Piripiri",
//         Cidade:"Verde",
//         Numero:"S/N",
//         Complemento:"45"
           
//       },
//       {
//         id: 5,
//         nomeCompleto: "Couto",
//         avatar: "https://i.pravatar.cc/300?img=48",
//         cep:"45897654",
//         Rua:" Dias da Silva",
//         Bairro: "Piripiri",
//         Cidade:"Verde",
//         Numero:"S/N",
//         Complemento:"45"
           
//       },

//     ]
// const meusenderecosController={
//     index:(req,res)=>{
//        return res.render("endereco");
        
// },
//   endereco:(req,res)=>{
//         return res.render("endereco",{title:"Endereço",enderecos});
//     },
//     show:(req,res)=>{
//         const{id}=req.params;
//         const enderecoResult=users.find(user=>user.id===parseInt(id));
// if(!enderecoResult){
//     return res.render("endereco",{title:"Visualizar Endereço",user:enderecoResult})
// }
//     }
// }

// / CREATE - Criar um usuario
//     store:(req,res)=>{ 
//     const {nomeCompleto, cep,rua, bairro, Cidade,numero,complemento}=req.body;
//     // para validação
//     // ! é negação 
//     //  condicional ou
//     if(!nomeCompleto|| !cep|| !rua|| !bairro|| ! Cidade|| !numero|| !complemento ){
//     return res.status(404)
//     .json({message:"Preencha Todos Os Campos"})
//     }
//     users.push({
//     // length pega a quantidade de usuarios e soma 1
//     id:users.length + 1,
//     nomeCompleto, cep,rua, bairro, Cidade,numero,complemento 
//         })
//      res.status(201).json({Messange: "Endereço Criado com Sucesso"});
// },
// // update-atualizar um usuario
//     update:(req,res)=>{
//     const {id}= req.params
//     const {nomeCompleto, cep,rua, bairro, Cidade,numero,complemento}=req.body;
//     const result= users.find((users)=>
//     users.id===parseInt(id));
//     if(!result){
//         return res
//         .status(400)
//         .json({message:"Nenhum Endereço Encontrado"})
//     }
// const newUser=result;
// if(nomeCompleto) newUser.nomeCompleto=nomeCompleto;
// if(cep) newUser.cep=cep;
// if(rua) newUser.rua=rua;
// if(bairro) newUser.bairro=bairro;
// if(Cidade) newUser.Cidade=Cidade;
// if(numero) newUser.numero=numero;
// if(complemento) newUser.complemento=complemento;
// return res.status(200).json({message:"Atualização Realizada Com Sucesso"})
    
// },
// // delete - deletar um usuario
// delete:(req,res)=>{ 
//     const {id}= req.params;
//     const result= users.findIndex((users)=>
//     users.id===parseInt(id));
//     if(result===-1){
//         return res
//         .status(400)
//         .json({message:"Nenhum Endereço Encontrado"})
//     }
// users.splice(result,1);
// return res
// .status(200)
// .json({message:"Endereço Deletado Com Sucesso"})
// },
// save:(req,res)=>{
//     const {id,name}= req.params;
//     if(name){
//         res.send(`Save ${id} e ${name}`);
//     } else{
//         res.send(`Save ${id}`);
//     }
//     }
// };





// module.exports=meusenderecosController;
var creditos=require("../data/creditos.json")
creditos=creditos.data;
const meuscreditosController={

    index:(req,res)=>{
        return res.render("meuscreditos");
         
    },

        // index:(req,res)=>{
        //     // listar os usuarios
        //     // .json retorna o objeto para o front and 
        //     // listar via objeto
        //    return res
        //    .status(200)
        //            .json({data:creditos, message:"listagem realizada com sucesso"});
        //         } ,
       
    
    show:(req,res)=>{
        const { id }= req.params
        const result=creditos.find((user)=>{
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
        const {data, Historico,tipoDeLançamento,
            Valor}=req.body;
        // para validação
        // ! é negação 
        //  condicional ou
        if(!data|| !Historico|| !tipoDeLançamento|| !
            Valor){
        return res.status(404)
        .json({message:"Preencha todos os campos"})
        }
        creditos.push({
        // length pega a quantidade de usuarios e soma 1
        id:creditos.length + 1,
        data, 
        Historico,
        tipoDeLançamento,
        Valor
               })
         res.status(201).json({Messange: "Usúario Criado com Sucesso"});
    },
    update:(req,res)=>{
        const { id }= req.params
        const {data, Historico,tipoDeLançamento,
        Valor}=req.body;
        const result=creditos.find((creditos)=>{
           return creditos.id === parseInt(id);
         })
         if(!result){
            return res
            .status(400)
            .json({message:"Nenhum usuário encontrado"})
        }
        const newUser=result;
        if(data) newUser.data=data;
        if(Historico) newUser.Historico=Historico;
        if(tipoDeLançamento) newUser.tipoDeLançamento=tipoDeLançamento;
        if(Valor) newUser.Valor=Valor;
       
        return res.status(200).json({message:"Atualização realizada com sucesso"})
            
        },

    
    
    delete:(req,res)=>{
        const { id }= req.params
        const {data, Historico,tipoDeLançamento,
        Valor}=req.body;
        const result=creditos.findIndex((creditos)=>{
           return creditos.id === parseInt(id);
         })
         if(result===-1){
            return res
            .status(400)
            .json({message:"Nenhum usuário encontrado"})
        }
        creditos.splice(result,1);
        return res
.status(200)
.json({message:"Usuario deletado com sucesso"})
},
  
    }
    
    module.exports=meuscreditosController;


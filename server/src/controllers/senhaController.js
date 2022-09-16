const fs=require("fs");
const path=require("path")
const files=require("../helpers/files")
// var users=require("../data/users.json");
// users=users.usuarios;

const userJson=fs.readFileSync(

  path.join(__dirname,"..","data","users.json"),
  "utf-8"
)
const users=JSON.parse(userJson);

const senhaController={


edit:(req,res)=>{
    const {id} = req.params;
    const userResult = users.find((user) => user.id === parseInt(id))
    if (!userResult){
        return res.render("error", {
            title: "Ops!",
            message: "Nenhuma Senha Cadastrada",
          });
            
    }

    const user ={
      ...userResult,
      avatar:files.base64Encode(__dirname + "/../../uploads/" + userResult.avatar),
    }
    return res.render("editarsenha", {
        title: "Alterar Senha",
        user
      });
    },
    
    
    // update-atualizar um endereco
        update:(req,res)=>{
        const {id}= req.params
        const {senha, novaSenha,confirmaçãoSenha}=req.body;
        const userResult= users.find((users)=>
        users.id===parseInt(id));
        if (!userResult){
            return res.render("error", {
                title: "Ops!",
                message: "Nenhuma Senha Cadastrada",
              });
            }
            if(senha !== confirmaçãoSenha){
              return res.render("register",{
                  title:"Cadastro",
                  error:{
                      message:"Senha não coincidem",}
              });
          }  



    const updateUser=userResult;
    if(senha) updateUser.senha=senha;
    if(novaSenha) updateUser.novaSenha=novaSenha;
    if(confirmaçãoSenha) updateUser.confirmaçãoSenha=confirmaçãoSenha;


    fs.writeFileSync(
      path.join(__dirname,"..","data","users.json"),
      // conteudo do novo arquivo cpnvertendo o array em string
      JSON.stringify(users)
      );
    
    return res.render("success", {
        title: "Senha atualizada",
        message: `Senha atualizada com sucesso`,
      });
    },
    






}
    
  





 module.exports=senhaController;
 


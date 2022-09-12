const files=require("../helpers/files")
var users=require("../data/users.json");
users=users.usuarios;
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
        const {senha, nonovaSenhavoEmail,confirmaçãoSenha}=req.body;
        const userResult= users.find((users)=>
        users.id===parseInt(id));
        if (!userResult){
            return res.render("error", {
                title: "Ops!",
                message: "Nenhuma Senha Cadastrada",
              });
            }
    const newUser=userResult;
    if(senha) newUser.senha=senha;
    if(nonovaSenhavoEmail) newUser.novaSenha=novaSenha;
    if(confirmaçãoSenha) newUser.confirmaçãoSenha=confirmaçãoSenha;
    return res.render("success", {
        title: "Senha atualizada",
        message: `Senha atualizada com sucesso`,
      });
    },
    






}
    
  





 module.exports=senhaController;
 

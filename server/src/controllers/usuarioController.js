const Sequelize= require("sequelize");
const configDB=require("../config/database");
const db=new Sequelize(configDB)

const userController = {
  index: async (req, res) => {
    try{
    const users =await db.query ("SELECT * FROM  users",{
      type:Sequelize.QueryTypes.SELECT,
         });
        // console.log(users);
        return res.render("usuarios", { title: "Lista de usuários", users});
         //res.status(200).json({data:users,message:"Busca realizada com sucesso"})
        } catch(error){
          console.log(error);
         res.status(400).json({message:"Erro na busca de usuários"});
         
        }
      },
 show: async (req,res)=>{
  const {id}=req.params;
    try{
// const users= await db.query(`SELECT * FROM  users WHERE id= %{id}`,{
//   type:Sequelize.QueryTypes.SELECT,
// })

const userResult= await db.query("SELECT * FROM  users WHERE id= :id",{
  replacements:{
    id:id
  },
  type:Sequelize.QueryTypes.SELECT,
})

console.log(userResult)
if(userResult.length===0){
  throw Error ("Nenhum usuário encontrado")
}
return res.render("usuario", { title: "Usuário", user:userResult[0] });
  }catch(error){
    console.log(error);
        res.render("error",{title:"Ops!",message: "Nenhum usuário encontrado",

    })
    

  }
 
        
  },

//criar usuario
// store: async(req,res)=>{
//   const {nome,cpf,celular,nascimento,rg , sexo, telefone,instagram,receber }=req.body;
//   try{
//     const users= await db.query("")

//   }catch (error){
//     console.log(error);
//     res.status(400).json({message:"Error ao criar usuário"})
//   }
// }

  // show:async (req, res) => {
  //   const { id } = req.params;
  //   //const userResult = users.find((user) => user.id === parseInt(id));

  //   // const sql="select * from users WHERE users.id = " + id
  //   //connection.query(sql, (error, results, fields)  => {

  //      const userResult = await User.findOne({where:{id:id}})
     
        

  //       if (!userResult) {
  //                 return res.render("error", {
  //           title: "Ops!",
  //           message: "Nenhum usuário encontrado",
  //         });
  //       }

  //       console.log(userResult)
  //      let nascimento= new Date(userResult.nascimento)
  //      let dia=nascimento.getDate()
  //      let mes=nascimento.getMonth()+1
  //      let ano=nascimento.getFullYear()
  //       nascimento=`${ano}-${mes}-${dia}`

        
  //       const user ={
  //         ...userResult,
  //            nascimento,
             

  //         // avatar:files.base64Encode(upload.path + userResult.avatar),
  //       }
  //       return res.render("usuario", { title: "Usuário", user });
    
  // },

  
  // update:(req,res)=>{
  //    const {id}= req.params
  //    const {nome,cpf,celular,nascimento,rg , sexo, telefone,instagram,receber }=req.body;
   


  //   const updateUser=userResult;
  //   if(nome) updateUser.nome=nome;
  //   if(cpf) updateUser.cpf=cpf;
  //   if(telefone) updateUser.telefone=telefone;
  //   if(rg) updateUser.rg=rg;
  //   if(celular) updateUser.celular=celular;
  //   if(sexo) updateUser.sexo=sexo;
  //   if(nascimento) updateUser.nascimento=nascimento;
  //   if(instagram) updateUser.instagram=instagram;
  //   if(receber) updateUser.receber=receber;


    
  //   updateResult=connection.query('UPDATE user SET  nome=""' + nome +  '" where id = ' + id, function (error, results, fields) {return (results)
  //   })
    
  //   console.log("updateResult"+updateResult)

  //   return res.render("success", {
  //       title: "Usuário atualizado",
  //       message: `Usuário ${updateUser.nome} atualizado com sucesso`,
  //     });
  //   },
    







}




module.exports = userController;
const fs=require("fs")
const files=require("../helpers/files")
const upload = require("../config/upload");

var users=require("../data/users.json");
users=users.usuarios;   

const userController = {
  index: (req, res) => {
    return res.render("usuarios", { title: "Lista de usuários", users});
  },


  show: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
const user ={
  ...userResult,
  avatar:files.base64Encode(upload.path + userResult.avatar),
}


return res.render("usuario", { title: "Usuário", user });
  },
}


module.exports = userController;
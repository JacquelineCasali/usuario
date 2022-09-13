const files=require("../helpers/files")
const upload = require("../config/upload");

var users=require("../data/users.json");
users=users.usuarios;   

const pedidosController = {
  show: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum pedido encontrado",
      });
    }
const user ={
  ...userResult,
  avatar:files.base64Encode(upload.path + userResult.avatar),
}


    return res.render("pedidos", { title: "Meus Pedidos", user });
  },
}

module.exports = pedidosController;

const db=require("../config/sequelize");
const Sequelize = require("sequelize");


const Usuario=db.define("Usuario",{
    
        id:{
            type:Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
        },
    
        nome:{
            type:Sequelize.DataTypes.STRING(100),
            allowNull:false,
            },
        
        cpf:{
            type:Sequelize.DataTypes.STRING(50),
            allowNull: false,
        },
    celular:{
        type:Sequelize.DataTypes.STRING(50),
        allowNull: false,
    },
    nascimento:{
        type:Sequelize.DataTypes.DATE
        
    },
    email:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull: false,
    },

senha:{
    type:Sequelize.DataTypes.STRING(200),
    allowNull: false,
},
    
    is_admin:{
        type:Sequelize.DataTypes.BOOLEAN
    },
sexo:{
    type:Sequelize.DataTypes.STRING(3),
},

rg:{
    type:Sequelize.DataTypes.STRING(50)
},
telefone:{
    type:Sequelize.DataTypes.STRING(50)
},

receber:{
    type:Sequelize.DataTypes.STRING(3)
},
instagram:{
    type:Sequelize.DataTypes.STRING(100)
},
    createdAt:{
        type:Sequelize.DataTypes.DATE
    },
    modifiedAt:{
        type:Sequelize.DataTypes.DATE
    }
},
    {
        tableName:"users",
        timestamps: false,

    });


module.exports=Usuario;
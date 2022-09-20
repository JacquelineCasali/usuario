const db=require("../../config/sequelize");
const Sequelize = require("sequelize");


const Usuario=db.define("Usuario",{
    
        id:{
            type:Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
        },
    
        name:{
            type:Sequelize.DataTypes.STRING(100).NOT.NULL,
            },
        
        cpf:{
            type:Sequelize.DataTypes.STRING(100).NOT.NULL,
            allowNull: false,
        },
    celular:{
        type:Sequelize.DataTypes.STRING(100).NOT.NULL,
        allowNull: false,
    },
    birthdate:{
        type:Sequelize.DataTypes.DATE
    },
    email:{
        type:Sequelize.DataTypes.STRING(100).NOT.NULL,
        allowNull: false,
    },
    
    is_admin:{
        type:Sequelize.DataTypes.DEFAULT
    },
    createdAt:{
        type:Sequelize.DataTypes.DATE
    },
    modifiedAt:{
        type:Sequelize.DataTypes.DATE
    }
},
    {
        tableName:"ecommerce",
        timestamps: false,

    });


module.exports=Usuario;
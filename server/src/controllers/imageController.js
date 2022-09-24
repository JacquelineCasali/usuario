const Image=require("../models/Image")
// const database = require("../config/database");

const ImageController={

index:async(req,res)=>{
// try{
// const images=await Image.findAll()
// console.log(images);
// }catch(error){
//     console.log(error);
//     res.status(400).json({message:error.message});
// }


},
show:async(req,res)=>{},
// criar imagem
store:async(req,res)=>{
    try{
if(!req.file){
    throw Error("Arquivo não submetido")
}
const extensionFile=req.file.filename.split(".")[1]
//salvar o arquivo
const image=await Image.create({
    path: req.file.filename,
    size:req.file.size,
    extension:extensionFile,
});
console.log(image);
res.status(200).json({image});
}catch(error){
console.log(error);
res.status(400).json({message:error.message});
}
},
update:async(req,res)=>{},
delete:async(req,res)=>{},



}

module.exports=ImageController;
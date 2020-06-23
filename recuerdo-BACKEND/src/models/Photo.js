const {Schema,model}=require("mongoose");

const PhotoSchema=new Schema({
    user:Schema.ObjectId, //se guarda el id del usuario
    title:String,
    description:String,
    imgURL:String,
    public_id:String
});
module.exports=model("Photo",PhotoSchema);
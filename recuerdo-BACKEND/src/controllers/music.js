var mediaserver=require("mediaserver");
var path=require("path")
var fs=require("fs");
ctrl={};

ctrl.obtenerMusica= (req,res)=>{
    console.log("pide musica");
    try{
        var cancion=path.join(__dirname,"../resource/musica",req.params.id);
        console.log(cancion);
        mediaserver.pipe(req,res,cancion);
    }
    catch(err){
        res.send("no se hallo musica")
    } 
    //res.send("hola");
},
ctrl.obtenerLista=(req,res)=>{
    console.log("pide lista de canciones");
    fs.readdir(path.join(__dirname,"../resource/musica"),function(err,file){
        console.log(file);
        res.json(file);
    });
    
}


module.exports=ctrl;
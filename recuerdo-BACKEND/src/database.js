const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
//promesa then ejecuta si tod esta ok
.then(db=>console.log("bd conectada"))//que se conecte a la direccion dada y le damos una configuracion
// catch captura un error al conectarte si ocurre
.catch(err=>console.error(err));
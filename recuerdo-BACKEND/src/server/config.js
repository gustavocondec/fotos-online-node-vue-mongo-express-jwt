const path=require("path");
const express=require("express");
const multer=require("multer");
const morgan=require("morgan");
const routes=require("../routes/index");
const jwt=require("../config/jwt");
const errorHandler=require("../helpers/error-handler");
var cors=require("cors");
module.exports=app=>{
    //configuraciones
    app.set("port",process.env.PORT);
    app.set("views",path.join(__dirname,"../views"));
    //middlewares
    app.use(cors());      
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(jwt());
    const storage=multer.diskStorage({
        destination:path.join(__dirname,"../public/uploads"),
        filename:(req,file,cb)=>{
            cb(null,new Date().getTime()+path.extname(file.originalname));
        }
    });
    app.use(multer({storage}).single("image")); 
    //rutas
    routes(app);

    app.use(errorHandler);
    return app;
}
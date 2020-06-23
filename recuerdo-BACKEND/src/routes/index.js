const express=require("express")
const router=express.Router();

const home=require("../controllers/home");

const image=require("../controllers/image");
const user=require("../controllers/user");
const music=require("../controllers/music");
module.exports=app=>{

    //home
    router.get("/",home.index);
    //image
    router.get("/images", image.images);
    router.get("/images/add", image.get_add);
    router.post("/images/add", image.post_add);
    router.get("/images/delete/:photo_id", image.delete);
    //users
    router.get("/login",user.get_signin);
    router.post("/login",user.post_signin);
    router.get("/registrarse",user.get_signup);
    router.post("/registrarse",user.post_signup);
    router.get("/logout",user.logout);
    //music
    router.get("/cancion/:id",music.obtenerMusica);
    router.get("/canciones",music.obtenerLista);
    app.use(router);
};
ctrl={};
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const mail=require("../config/mailCtrl");
ctrl.get_signin=(req,res)=>{
    res.render("users/signin");
};/*
ctrl.post_signin=passport.authenticate("local",{
    
    //successRedirect:"/logeado",
    //failureRedirect:"/users/signin",
    //failureFlash:true
});*/

async function verificar({email,password}){
    const user=await User.findOne({email});
    if(user&&await user.matchPassword(password)){
        const{password,...userWithoutHash}=user.toObject();
        const token =jwt.sign({sub:user.id},process.env.KEY_SECRET);
        return{
            ...userWithoutHash,
            token
        };
    }
};
ctrl.post_signin= async function (req, res, next) {
    console.log("solicitud de login");
    console.log(req.body);
    verificar(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
};
ctrl.get_signup=(req,res)=>{
    res.render("users/signup");
};
ctrl.post_signup=async (req,res,next)=>{
    const {name,email,password,confirmpassword}=req.body;
    const errors=[];
    console.log(req.body);
    console.log(req.body.password);
    console.log(req.body.confirmpassword);
    if(password!=confirmpassword){
        errors.push({text:"password dont match"});
    }
    if(password.length<6)
    {
        errors.push({text:"contraseña minimo 6 caracteres"});
    }
    if(errors.length>0){
        res.json(errors);
    }else{
        const emailuser=await User.findOne({email:email});
        if(emailuser){
            console.log("correo en uso")
            //res.redirect("/users/signup");
            res.status(201).json({msg:"el correo esta en uso"})
        }else{
            const newUser= new User({name,email,password});
            newUser.password=await newUser.encryptPassword(password);
            console.log("parece que se guardo en bd")
            await newUser.save();
            //res.redirect("/users/signin");
            //mail.enviarEmailRegistro(email,name);
            res.status(200).json({msg:"registro correctamente"})
        }
    }
};
ctrl.logout=(req,res)=>{
    req.logout();
    //res.redirect("/");
    res.send({msg:"cERRO SESION"})
};
ctrl.recuperarPassword=async (req,res)=>{
    console.log("Solicitud de recuperacion de contraseña");
    console.log("correo a buscar: " + req.body);
    const user=await User.find({email:req.body.correo});
    console.log("encontro en bd: ",user);
    if(user.length==1){
        try{
            console.log("Existe correo")
            //generamos la contraseña
            var length = 4,
            charset = "abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
            nuevaPass = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                nuevaPass += charset.charAt(Math.floor(Math.random() * n));
            }
            console.log(nuevaPass);
            //encriptamos la contraseña
            const salt=await bcrypt.genSalt(10);
            const hash=await bcrypt.hash(nuevaPass,salt);        
            //hash es la contraseña encryptada
            user.password=hash;
            await user.save();
            //mail.enviarNuevoPassword(user.email,nuevaPass);

        }catch(error){

        }
    }else{
        console.log("no existe correo usuario");
    };
    res.status(200).json({mensaje:"De estar registrado, recibira un correo con su nueva contraseña"});
}
module.exports=ctrl;
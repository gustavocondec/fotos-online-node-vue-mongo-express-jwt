const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/User");

passport.use(new LocalStrategy({
    usernameField:"email"
},async(email,password,done)=>{
    const user=await User.findOne({email:email});
    if(!user){
        console.log("usuario no existe");
        return done(null,false,{message:"Not user Found"})
    }else{
        const match=await user.matchPassword(password);
        if(match){


            
            console.log("********logueado en back*****"+user);
            return done(null,user);
            
        }else{
            console.log("contraseña incorrecta");
            return done(null,false,{message:"incorrect password"});
        }
    }
}));
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

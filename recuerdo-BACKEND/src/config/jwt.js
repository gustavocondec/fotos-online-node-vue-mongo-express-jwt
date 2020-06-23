const expressJwt=require("express-jwt");
module.exports=jwt;


function jwt(){
    const secret=process.env.KEY_SECRET
    return expressJwt({secret/*,isRevoked*/})
    .unless({
        path:[
            //rutas que no seran verificadas por la autentificacion
            "/login",
            "/registrarse",
            "/canciones",
            { url: /^\/cancion\/.*/, methods: ['GET', 'PUT'] },//expresion reguñlar para quitar proteccione a /canciones/:id,
            "/resource/images/cora1.jpg"
        ]
    })
}
/*
async function isRevoked(req,payload,done){
    const user=
    //const user
    if(!user){
        return done(null,true);
    }
    done()
}*/
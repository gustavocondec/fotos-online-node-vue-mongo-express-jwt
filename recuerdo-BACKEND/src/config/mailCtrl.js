const ctrl={};//creacion de objeto
const nodemailer=require("nodemailer");

let user=process.env.CORREO_USER;
let pass=process.env.CORREO_PASS; 


let transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:user,
        pass:pass
    }
});

ctrl.enviarEmailRegistro=(correo,nombre)=>{//cada que se registran envia un correo de registro
    console.log("preparadno correo de registro a: "+correo);
    var mailOpciones={//configuramos el mensaje
        from:user,
        to:correo,
        subject:"Gracias por registrarte en Recuerdos",
        text:"Gracias por registrarte"
    };
    transporter.sendMail(mailOpciones,(error,info)=>{
        console.log("enviando correo de registro a: "+correo);
        if(error){
            console.log(error);
        }else{
            console.log("enviado ok a: "+correo);
        }
    })
};

ctrl.enviarNuevoPassword=(correo,nuevoPassword)=>{
    console.log("procesadno envio de nueva contraseña");
    var mailOpciones={
        from:user,
        to:correo,
        subject:"Nueva contraseña",
        text:"Solicito nueva contraseña: "+nuevoPassword
    };
    transporter.sendMail(mailOpciones,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Contraseña enviada a: "+correo);
            console.log(info)
        }
    })
};

module.exports=ctrl;
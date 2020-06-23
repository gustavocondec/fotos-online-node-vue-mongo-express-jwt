const ctrl={};
const Photo=require("../models/Photo");
const cloudinary=require("cloudinary");

cloudinary.config({ //conifurar cloudinay
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


ctrl.images=async (req,res)=>{
   // console.log("USER : ",req.user);
    console.log(req.user.sub);
    let userid=req.user.sub;
    //ojo
    //busca las fotos que tengan en un espacio user guardado el id
    /*const photos=await Photo.find({user:userid});
        //res.render("images",{photos});
        console.log("lee fotos***************")
        await console.log(photos);
        await res.json({fotos:photos})
    */
    await Photo.find({user:userid})
    .then(data=>{res.status(200).json({fotos:data})})
    .catch(err=>{
        console.log("ocurrio un error al leer la bd");
        console.log(err);
        res.status(500).json({msg:"error al leer los daros"});
    })

};
ctrl.get_add=async(req,res)=>{
   const photos=await Photo.find({user:req.user._id});
   //res.render("image_form",{photos});
   res.send({photos})
};
ctrl.post_add=async(req,res)=>{
    console.log("solicitud usbir archivo");
    console.log(req.file);
    console.log(req.body.description);
    console.log(req.user);


        console.log("subira archivo")
        const result=await cloudinary.v2.uploader.upload(req.file.path);//sube el archivo a cloudinay
        console.log("subio a cloudinary: ",result);

    const newPhoto=new Photo({//crea nuevo fotos schema
        user:req.user.sub, //id de quien sube la foto
        title:req.body.title,
        description:req.body.description,
        imgURL:result.url,//la urldonde se guardo la foto
        public_id:result.public_id//id public de la foto
    })
    await newPhoto.save();//guarda la foto
    const fs=require("fs-extra");
    await fs.unlink(req.file.path);
    res.send({msg:"subio correcto"})

};
ctrl.delete=async(req,res)=>{
    console.log("solicitud de borrar")
    const eliminado=await Photo.findByIdAndDelete(req.params.photo_id);
    try {
        const result=await cloudinary.v2.uploader.destroy(eliminado.public_id,{invalidate:true});
        console.log("eliminado : ",result);
    
    } catch (error) {
        
    }

    //res.redirect("/images/add");
    res.send({msg:"borro"})
};

module.exports=ctrl;
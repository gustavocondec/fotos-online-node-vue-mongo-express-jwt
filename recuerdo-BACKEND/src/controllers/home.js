const ctrl={};

ctrl.index=(req,res)=>{
    //res.render("index");

    res.json({a:"pagina de inicio"})
};



module.exports=ctrl;
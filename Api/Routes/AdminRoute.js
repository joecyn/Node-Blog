const express=require('express');
const Router=express.Router();
const multer=require('multer')
const Article=require("../model/Article")
//const upload=multer({dest:"./uploads"})

const Storage=multer.diskStorage({
    destination:"./public/images",
    filename:(req,file,cb)=>{
        cb(null, file.originalname );
    }
})
const Upload=multer({
    storage:Storage
}).single("image")



//HOME ROUTE
Router.get("/",async(req, res)=>{
  
    const articles= await Article.find().sort({"_id":-1})
   
    res.render("pages/Admin/AdminDash",{Articles:articles})
});
//DETAILPAGE ROUTE
Router.get("/ArticleDetails/:id",async (req,res)=>{
    const ArticleId= req.params.id
    
    const article= await Article.findById({_id:ArticleId})
    res.render("pages/Admin/AdminArticleDetails",{Article:article})
})

//DELETE ROUTE
Router.get("/DeleteArticle/:Id",async (req,res)=>{
    let ArticleId= req.params.Id
     await Article.findByIdAndDelete({_id:ArticleId}) 
    res.redirect("/admin")
})

//EDIT ROUTE
Router.get("/EditArticle/:Id",async(req,res)=>{
    const ArticleId=req.params.Id
    const article= await Article.findById({_id:ArticleId});
    res.render("pages/Admin/EditArticle",{Article:article})
})
Router.post("/EditArticle/:Id",async(req,res)=>{
    const ArticleId=req.params.Id;
    
    Upload(req,res,async(err)=>{
        if(err){
            console.log(err)
        }
        else{
            await  Article.findByIdAndUpdate({_id:ArticleId},
                {$set:{
                        title:req.body.title,
                        image:req.file.filename,
                        summary:req.body.summary,
                        description:req.body.description,
                        category:req.body.category 
        
                }}
                )
                .then(()=>res.redirect("/admin"))
                .catch(err=>console.log(err))
        }
    })
})
//NEW POST ROUTE
Router.get("/newPost",(req,res)=>{
    res.render("pages/Admin/newPost")
})

Router.post("/newPost",(req,res)=>{
    
     Upload(req,res,async(err)=>{
        
        if (err){
            console.log(err)
        }
        else{
             await Article.create({
                title:req.body.title,
                image:req.file.filename,
                summary:req.body.summary,
                description:req.body.description,
                category:req.body.category
            })
            
            .then(()=>res.redirect("/admin"))
            .catch(err=>console.log(err))
        }
    })
})




module.exports=Router;
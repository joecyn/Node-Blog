const express=require("express");
const Article=require("../model/Article")
const Router=express.Router();




//Route to Getting All the Articles
Router.get("/",async(req, res)=>{
    const articles= await Article.find().sort({"_id":-1})
    res.render("pages/Home",{Articles:articles})

    
})

//Route to SingleArticle

Router.get("/SingleArticle/:id",async (req,res)=>{
    const ArticleId= req.params.id
    
    const article= await Article.findById({_id:ArticleId})
    
    //const allRelatedArticles=await Article.find({category:article.category}).sort({ "_id" : -1}).skip(1).limit(4)
    //const RelatedArticles= allRelatedArticles.filter(AllArticles=>(AllArticles._id!==article._id))
    res.render("pages/Details",{Article:article,Realated:""})
})

//Routes according to Article categories
Router.get("/Category",async(req,res)=>{
    let cat =req.query.cat
    const articles= await Article.find({category:cat})
    res.render("pages/Category",{Articles:articles})

})


module.exports=Router;
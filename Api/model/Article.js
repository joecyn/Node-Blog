const mongoose=require("mongoose");

const ArticleSchema= new mongoose.Schema({
   
    title:{
        type:String,
        required:true,
        max:[20,"Title is too long"],
        lowercase:true,
        trim:true
    },
    image:{
        type:String
    },
    summary:{
        type:String,
        lowercase:true,
        trim:true
       
    },
    description:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }
     
},
{
    timestamp:true  
}
);

const Article=mongoose.model("article",ArticleSchema);
module.exports=Article;
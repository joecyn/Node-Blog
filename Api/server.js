const PostRouter = require("./Routes/PostsRoute");
const AdminRouter=require("./Routes/AdminRoute")
const express=require("express");
const mongoose=require("mongoose");
const cors =require("cors")
//const Post=require("./model/Posts")
const app=express();
const PORT=process.env.PORT || 5000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))

app.use(express.static(__dirname +"/uploads"));
app.set("view engine","ejs");
app.use(cors());



//DB connection
mongoose.connect("mongodb://0.0.0.0:27017/Blog")
.then(()=>console.log("Connected"))
.catch(err=>console.log(err));

//routes
app.use("/",PostRouter)
app.use("/admin",AdminRouter)



app.listen(PORT,()=>{
console.log(`App is listening on port:${PORT}`)
})



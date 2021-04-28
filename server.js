const express=require("express");
const app=express();
const bodyParser=require("body-parser");
require("dotenv").config();
const moment=require("moment");
const mongoose=require("mongoose");
const mongo=process.env.MONGO;
mongoose.connect(`mongodb+srv://${mongo}?retryWrites=true&w=majority`,{ useUnifiedTopology: true ,useNewUrlParser: true})
const Store=require("./models/stores");
const ejs=require("ejs");
const { default: axios } = require("axios");
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const PORT=process.env.PORT|| 3000;
app.use(express.static('public'))
app.get("/",(req,res)=>{
    Store.find({},null,{sort:{"createdAt":-1}},(err,foundStores)=>{
        if (err) {
            console.log(err);
        }else{
            res.render("home",{foundStores:foundStores,moment:moment});
        }
        
    })
})
app.get("/new/location",(req,res)=>{
    res.render("new");
})
app.post("/new/location",(req,res)=>{
    let store={
        storeName:req.body.storeName,
        address:req.body.address,
        district:req.body.district,
        phone:req.body.phone
    }
    Store.create(store,(err,store)=>{
        if (err) {
            console.log(err);
        }
        res.redirect("/");  
    })
})
app.post("/search",async (req,res)=>{
    try{
        const query=req.body.search;
        const result=await axios.get(`https://oxygenfinder.herokuapp.com/search/${query}`)
        res.render("home",{foundStores:result.data,moment:moment})
    }catch(err){
        res.redirect("/");
    }
    
})
app.get("/search/:searchQuery",(req,res)=>{
    Store.find({district:req.params.searchQuery},null,{sort:{"updatedAt":-1}},(err,foundStores)=>{
        res.json(foundStores);
    })
})
app.listen(PORT,(req,res)=>{
    console.log("SERVER STARTED");
})
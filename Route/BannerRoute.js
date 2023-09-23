const imageModel=require("../Model/ImageModel");
const express=require('express');
const Route=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const bannerImage=multer({storage:storage});

Route.get("/users",async(req,res)=>{
    const result=await imageModel.find();
    res.render("listing",{
        data:result
    })
    // res.status(200).json({
    //     success:true,
    //     message:"data fetched successfully",
    //     data:result
    // })
})

Route.get("/users/add",(req,res)=>{
    res.render("addListing")
})

Route.post("/users/add/create",bannerImage.single("image"),(req,res)=>{
    const result=new imageModel({
        image:req.file.path
    })
    result.save().then(()=>{
        // res.status(200).json({
        //     success:true,
        //     message:"data created successfully",
        //     data:result
        // })
        res.redirect("/users")
    })
    .catch(()=>{
        res.redirect("/users/add")
        console.log('error');
    })
})

Route.get("/users/edit/:id",async(req,res)=>{
    const result=await imageModel.findById(req.params.id);
    res.render("editListing",{data:result})
})

Route.post("/users/edit/update",bannerImage.single("image"),(req,res)=>{
    imageModel.findById(req.body.id)
    .then((result)=>{
        result.image=req.file.path;
        result.save();
        console.log('Updated!');
        res.redirect("/users");
    })
    .catch((error)=>{
        
        console.log(error);
    })
})

Route.get("/users/delete/:id",(req,res)=>{
    imageModel.findByIdAndDelete(req.params.id)
    .then(()=>{
        console.log('data is deleted');
        res.redirect("/users")
    })
})

module.exports=Route
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const ejs=require('ejs');
require('dotenv').config();
const bannerRoute=require("./Route/BannerRoute");
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.set('view engine','ejs');
app.set('views','views');
app.use('/upload',express.static('upload'))
const port=process.env.PORT;
const dbDriver=process.env.URL;
app.use(bannerRoute);
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected');
        console.log(`server is running at http://localhost:${port}/users`);
    })
})
.catch(()=>{
    console.log("error");
})
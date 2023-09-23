const mongoose=require('mongoose');
const schema=mongoose.Schema;
const ImageSchema=new schema({
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const ImageModel=mongoose.model("Images",ImageSchema);
module.exports=ImageModel
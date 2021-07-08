const mongoose =require('mongoose');

const brandsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    }
   
});
module.exports = mongoose.model('brands',brandsSchema);
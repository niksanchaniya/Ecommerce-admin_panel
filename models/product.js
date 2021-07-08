const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    subcategory_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategories',
        required:true
    },
    brand_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brands',
        required:true
    },
    img:String
});

module.exports = mongoose.model('products',productSchema);
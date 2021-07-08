const mongoose =require('mongoose');

const subcategorySchema = mongoose.Schema({
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

module.exports = mongoose.model('subcategories',subcategorySchema);
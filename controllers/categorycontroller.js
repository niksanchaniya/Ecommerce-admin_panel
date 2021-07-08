const Category = require("../models/category");

exports.Show = async (req, res) => {
    let category = await Category.find();
    res.render('category_show', { category: category });
};
  
exports.Save = async(req,res)=>{
    console.log(req.body.name);
    const category = new Category(req.body);
    try{
        await category.save();
        // res.status(200).send("inserted");
        res.redirect("/category_show");
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.Edit = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    let category =  await Category.findById(req.params.id);
    res.render('category_edit', { category: category });
};

exports.Update = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    await Category.findByIdAndUpdate(req.params.id,req.body,{ new: true });
     res.redirect('/category_show');  
};

exports.Delete = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/category_show');
};
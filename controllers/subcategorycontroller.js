const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

exports.Show = async (req, res) => {
    const data = [];
    const category = await Category.find();
    const subcategory = await Subcategory.find();
    subcategory.forEach(Element => {
        category.forEach(item =>{
            if(item._id.toString() == Element.category_id.toString()){
                const data1 = {
                    categoryname: item.name,
                    subcategoryname: Element.name,
                    _id:Element._id
                }
                data.push(data1);
            }
        })
    })
    res.render('subcategory_show', { data: data });
};

exports.Create = async(req, res) => {
	try {
		const category = await Category.find();

        res.render('subcategory_add',{category:category});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Save = async(req,res)=>{
    console.log(req.body);
    const subcategory = new Subcategory(req.body);
    try{
        await subcategory.save();
        res.redirect('/subcategory_show');
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.Edit = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    const category = await Category.find();
    let subcategory =  await Subcategory.findById(req.params.id);
    res.render('subcategory_edit', { subcategory: subcategory,category: category });
};

exports.Update = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    await Subcategory.findByIdAndUpdate(req.params.id,req.body,{ new: true });
     res.redirect('/subcategory_show');  
};

exports.Delete = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    await Subcategory.findByIdAndDelete(req.params.id);
    res.redirect('/subcategory_show');
};
const Brand = require("../models/brands"); 
const Category = require("../models/category");

exports.Show = async (req, res) => {
    const data = [];
    const category = await Category.find();
    const brand = await Brand.find();
    brand.forEach(Element => {
        category.forEach(item =>{
            if(item._id.toString() == Element.category_id.toString()){
                const data1 = {
                    categoryname: item.name,
                    brand: Element.name,
                    _id:Element._id
                }
                data.push(data1);
            }
        })
    })
    res.render('brand_show', { data: data });
};



exports.Save = async(req,res)=>{
    console.log(req.body.name);
    const brand = new Brand(req.body);
    try{
        await brand.save();
        res.redirect("/brand_show");
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.Create = async(req, res) => {
	try {
        const category = await Category.find();

        res.render('brand_add',{category:category});
      
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Edit = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    const category = await Category.find();
    let brand =  await Brand.findById(req.params.id);
    res.render('brand_edit', { brand: brand,category: category });
};

exports.Update = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    await Brand.findByIdAndUpdate(req.params.id,req.body,{ new: true });
     res.redirect('/brand_show');  
};

exports.Delete = async (req, res) => {
    // fs.unlinkSync(`public/uploads/${req.params.img}`);
    await Brand.findByIdAndDelete(req.params.id);
    res.redirect('/brand_show');
};


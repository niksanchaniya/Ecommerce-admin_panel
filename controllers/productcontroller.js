const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const Brand = require("../models/brands");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");


exports.Show = async (req, res) => {
	const data = [];
  const category = await Category.find();
  const brand = await Brand.find();
  const subcategory = await Subcategory.find();
  const product = await Product.find();

	product.forEach(Element => {
		brand.forEach(item => {
			subcategory.forEach(addoniteam => {
			category.forEach(DishCateiteam => {
					if(item._id.toString() == Element.brand_id.toString()) {
						if(addoniteam._id.toString() == Element.subcategory_id.toString()) {
							if(DishCateiteam._id.toString() == Element.category_id.toString()) {
                const data1 = {
                  product:Element.name,
                  categoryname: DishCateiteam.name,
                  subcategory:addoniteam.name,
                  brand:item.name,
                  _id:Element._id,
                  img:Element.img
              }
              data.push(data1);
							}
						}
					}
				})
			})
		})
	})
	res.render('product_show', { data: data });
};

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './public/uploads');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

exports.Create = async(req, res) => {
		const category = await Category.find();
        const subcategory = await Subcategory.find();
        const brand = await Brand.find();
        console.log(category);

        res.render('product_add',{category:category,subcategory:subcategory,brand:brand});
}

exports.Save = async(req,res)=>{
    console.log(req.body);
    let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3}, }).single('image');
    upload(req,res, async function(err) {
    const product = new Product({
        name:req.body.name,
        category_id:req.body.category_id,
        subcategory_id:req.body.subcategory_id,
        brand_id:req.body.brand_id,
        img: req.file.filename,
    });
    try{
        await product.save();
        res.redirect('/product_show');
    }
    catch(err){
        res.status(500).send(err);
    }
});
}

exports.Edit = async (req, res) => {
  // fs.unlinkSync(`public/uploads/${req.params.img}`);
  const category = await Category.find();
  const subcategory = await Subcategory.find();
  const brand = await Brand.find();
  let product =  await Product.findById(req.params.id);
  res.render('product_edit', { brand: brand,category: category,subcategory: subcategory, product: product});
};

exports.Update = async (req, res) => {
    let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
    upload(req, res, async function (err) {
        if (!req.file) {
            let product = await Product.findById(req.params.id);
            await Product.updateOne({ _id: req.params.id }, {
                img: product.img,
                name:req.body.name,
                category_id:req.body.category_id,
                subcategory_id:req.body.subcategory_id,
                brand_id:req.body.brand_id,
            }, function (err, result) {
            if (err) {
                res.send("err" + err);
            } else {
                res.redirect("/product_show");
            }
            });
        }
        else {
            await Product.updateOne({ _id: req.params.id }, {
                name:req.body.name,
                category_id:req.body.category_id,
                subcategory_id:req.body.subcategory_id,
                brand_id:req.body.brand_id,
                img: req.file.filename
            }, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                if(req.params.img){
                    fs.unlinkSync(`public/uploads/${req.params.img}`);
                }
                res.redirect("/product_show");
            }
            });
        } 
    });
};

exports.Delete = async (req, res) => {
  fs.unlinkSync(`public/uploads/${req.params.img}`);
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/product_show');
};


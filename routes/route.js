const express =require("express");
const app = express();
const Categorycontroller= require("../controllers/categorycontroller");

const Subcategorycontroller= require("../controllers/subcategorycontroller");
const Brandcontroller= require("../controllers/brandcontroller");
const Productcontroller= require("../controllers/productcontroller");


app.get('/',(req,res) => {
    res.render('home');
});

app.get('/category_show',Categorycontroller.Show);
app.get('/category_create',(req,res) => {res.render('category_add');});
app.post('/category_save',Categorycontroller.Save);
app.get('/category_edit/:id',Categorycontroller.Edit);
app.post('/category_update/:id',Categorycontroller.Update);
app.post('/category_delete/:id',Categorycontroller.Delete);

app.get('/subcategory_show',Subcategorycontroller.Show);
app.get("/subcategory_create",Subcategorycontroller.Create);
app.post('/subcategory_save',Subcategorycontroller.Save);
app.get('/subcategory_edit/:id',Subcategorycontroller.Edit);
app.post('/subcategory_update/:id',Subcategorycontroller.Update);
app.post('/subcategory_delete/:id',Subcategorycontroller.Delete);

app.get("/brand_create",Brandcontroller.Create);
app.post("/brand_save",Brandcontroller.Save);
app.get('/brand_show',Brandcontroller.Show);
app.get('/brand_edit/:id',Brandcontroller.Edit);
app.post('/brand_update/:id',Brandcontroller.Update);
app.post('/brand_delete/:id',Brandcontroller.Delete);




app.get("/product_create",Productcontroller.Create);
app.post("/product_save",Productcontroller.Save);
app.get('/product_show',Productcontroller.Show);
app.get('/product_edit/:id',Productcontroller.Edit);
app.post('/product_update/:id/:img',Productcontroller.Update);
app.post('/product_delete/:id/:img',Productcontroller.Delete);



module.exports=app;
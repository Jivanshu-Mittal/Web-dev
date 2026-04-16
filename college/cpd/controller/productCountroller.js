const ProductModel = require("../model/productSchema");

const getAllProducts = async(req, res)=>{
    try {
        const allProducts = await ProductModel.find({});
        res.render("products/Home.ejs", {allProducts});
    } catch (error) {
        console.log(error);
        res.send("something went wrong") 
    }
}

const showAddProductForm = (req, res)=>{
        res.render("products/addProduct");
}


const addProduct = async(req, res)=>{
        try {
            await ProductModel.create(req.body);
            res.redirect("/products") 
        } catch (error) {
            console.log(error)  
            res.send("something went wrong") 
        }
}

const singleProduct = async(req, res)=>{
    try {
        const productId = req.params.pid;
        const product = await ProductModel.findById(productId).populate("reviews");
        res.render("products/singleProduct.ejs", {product});
    } catch (error) {
        console.log(error);
    }
}

const showUpdateProductForm = async(req, res)=>{
    try {
        const productId = req.params.pid
        const product = await ProductModel.findById(productId);
        res.render("products/updateProduct", {product})
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async(req, res)=>{
        try {
            const productId = req.params.pid;
            const updatedData = req.body;
            await ProductModel.findByIdAndUpdate(productId, updatedData);
            res.redirect("/products")
        } catch (error) {
            console.log(error);
        }
}

const deleteProduct = async(req, res)=>{
    try {
        const productId = req.params.pid;
        await ProductModel.findByIdAndDelete(productId);
        res.redirect("/products")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllProducts, showAddProductForm, addProduct, singleProduct, showUpdateProductForm, updateProduct, deleteProduct};
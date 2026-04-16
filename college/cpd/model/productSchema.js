const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pid:{
    type:String,
    required:true,
    trim:true
  },
  title:{
    type:String,
    required:[true, "Product title is required"],
    trim:true
  },
  price:{
    type:Number,
    required:[true, "Product Price is required"],
    trim:true,
  },
  description:{
    type:String,
    required:[true, "Product description is required"],
    trim:true
  },
  category:{
    type:String,
    trim:true,
    required:[true, "Category is required"]
  }, 
  image:{
    type:String,
    trim:true,
    required:[true, "Product image is required"]
  },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
}, {timestamps:true})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
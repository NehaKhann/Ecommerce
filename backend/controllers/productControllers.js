import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
//@desc get all products
// route : api/products/
// Get request
export const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({});
  res.json(products);
});
//@desc get product by id
// route : api/products/id
// Get request 
export const getProductById = asyncHandler(async(req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.json(product);
  } catch (error) 
  {
    res.status(404);
    throw new Error("Product Not found");
  }
});

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverried = require('method-override');

const Product = require('./models/product');

mongoose.connect(('mongodb://localhost:27017/farmstand'))
.then(() => {
    console.log('Mongo Connection Open')
})
.catch((err) => {
    console.log('Mongo Connection Error');
    console.log(err);
})

app.set(('views'), path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(methodOverried('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// Products Index
app.get('/products', async (req,res) => {
   const {category} = req.query;
   if(category) {
       const products = await Product.find({category: category});
       res.render('products/index', {products, category});
   } else {
       const products = await Product.find({});
       res.render('products/index', {products, category: 'All'});
   }
})

// New Product
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories});
})

// Create Product
app.post('/products', async (req,res) => {
   const newProduct = new Product(req.body);
   await newProduct.save();
   res.redirect(`/products/${newProduct._id}`);
})

// Show Product
app.get('/products/:id', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
})

// Edit Product
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{ product, categories });
})

// Update Product
app.put('/products/:id', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect('/products')
})

// Delete Product
app.delete('/products/:id', async (req,res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(1800, () => {
    console.log('App Listening on Port 1800')
})
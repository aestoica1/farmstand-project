const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect(('mongodb://localhost:27017/farmstand'))
.then(() => {
    console.log('Mongo Connection Open');
})
.catch((err) => {
    console.log('Mongo Connection Error');
    console.log(err);
})

const seedProducts = [
    {
        name: 'Apple',
        price: 1.10,
        category:'fruit'
    },
    {
        name: 'Celery',
        price: 1.40,
        category:'vegetable'
    },
    {
        name: 'Organic Whole Milk',
        price: 2.90,
        category:'dairy'
    },
    {
        name: 'Dragon Fruit',
        price: 3.90,
        category:'fruit'
    },
    {
        name: 'Onion',
        price: 1.02,
        category:'vegetable'
    },
];

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
})
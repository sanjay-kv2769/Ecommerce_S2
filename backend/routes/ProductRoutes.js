const express = require('express');
const productSchema = require('../models/productSchema');
const productRoute = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// npm i express multer cloudinary multer-storage-cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Ecommerce_S2',
  },
});
const upload = multer({ storage: storage });

productRoute.post('/addProduct', upload.single('image'), (req, res) => {
  const Data = new productSchema({
    name: req.body.name,
    price: req.body.price,
    image: req.file ? req.file.path : null,
    // image: req.file ? req.file.filename : null,
  });
  Data.save()
    .then((data) => {
      res.status(201).json({
        Success: true,
        Error: false,
        Message: 'Data added successfully',
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        Success: false,
        Error: true,
        ErrorMessage: error,
      });
    });
});

productRoute.get('/viewProduct', (req, res) => {
  productSchema
    .find()
    .then((data) => {
      res.status(200).json({
        Success: true,
        Error: false,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        Success: false,
        Error: true,
        ErrorMessage: error,
      });
    });
});

productRoute.get('/view-employee/:id', (req, res) => {
  productSchema
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      // res.send(data);

      return res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((err) => console.log(err));
});
productRoute.put('/update-product/:id', upload.single('image'), (req, res) => {
  productSchema
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      data.name = req.body.name;
      data.price = req.body.price;
      (data.image = req.file ? req.file.path : null),
        (data.image = req.file.filename);
      data
        .save()
        .then((data) => {
          return res.status(200).json({
            success: true,
            error: false,
            data: data,
            message: 'updated successfully',
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//  delete employee
productRoute.delete('/delete-product/:id', (req, res) => {
  productSchema
    .deleteOne({
      _id: req.params.id,
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        error: false,
        message: 'Deleted successfully',
      });
    })
    .catch((err) => console.log(err));
});

module.exports = productRoute;

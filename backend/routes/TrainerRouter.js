const express = require('express');
const TrainerDB = require('../models/TrainerSchema');
const TrainerRoute = express.Router();
// npm i cloudinary multer-storage-cloudinary
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const CheckAuth = require('../middlewares/CheckAuth');
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

TrainerRoute.post('/addtrainer', upload.single('image'), async (req, res) => {
  try {
    const lastData = await TrainerDB.findOne().sort({ id: -1 }).exec();
    const nextData = (lastData && lastData.id + 1) || 1;
    const Data = {
      id: nextData,
      name: req.body.name,
      place: req.body.place,
      role: req.body.role,
      image: req.file ? req.file.path : null,
    };
    const data = await TrainerDB(Data).save();
    if (data) {
      return res.status(201).json({
        Success: true,
        Error: false,
        Message: 'Data added successfully',
        data: data,
      });
    } else {
      return res.status(400).json({
        Error: true,
        Success: false,
        Message: 'Error, Data no added',
      });
    }
  } catch (error) {
    return res.status(500).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error.message,
    });
  }
});

TrainerRoute.get('/viewtrainers', (req, res) => {
  TrainerDB.find()
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

TrainerRoute.get('/view-trainer/:id', (req, res) => {
  TrainerDB.findOne({
    id: req.params.id,
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
TrainerRoute.put('/update-trainer/:id', upload.single('image'), (req, res) => {
  TrainerDB.findOne({
    id: req.params.id,
  })
    .then((data) => {
      data.name = req.body.name ? req.body.name : data.name;
      data.place = req.body.place ? req.body.place : data.place;
      data.role = req.body.role ? req.body.role : data.role;
      (data.image = req.file ? req.file.path : data.image),
        // (data.image = req.file.filename);
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
          .catch((err) => {
            return res.status(400).json({
              success: false,
              error: true,
              message: 'updation failed',
            });
          });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Internal server error',
        ErrorMessage: err.message,
      });
    });
});

//  delete employee
TrainerRoute.delete('/delete-product/:id', (req, res) => {
  TrainerDB.deleteOne({
    id: req.params.id,
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

module.exports = TrainerRoute;

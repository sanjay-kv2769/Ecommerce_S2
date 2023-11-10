// import express from 'express';
// import mongoose from 'mongoose';
// import productRoute from './routes/ProductRoutes';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

const express = require('express');
const { default: mongoose } = require('mongoose');
const productRoute = require('./routes/ProductRoutes');
const app = express();
const cors = require('cors');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Server is working fine');
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected on PORT:${process.env.PORT}`);
});

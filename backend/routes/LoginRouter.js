const express = require('express');
const loginSchema = require('../models/loginSchema');
const LoginRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const RegisterData = require('../models/registerSchema');
require('dotenv').config();

LoginRouter.post('/login', async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      const oldUser = await loginSchema.findOne({
        username: req.body.username,
      });
      if (!oldUser) {
        return res.status(400).json({
          Success: false,
          Error: true,
          Message: 'Register First',
        });
      }

      const isPasswordCorrect = bcrypt.compare(
        req.body.password,
        oldUser.password
      );
      if (!isPasswordCorrect) {
        return res.json({
          Success: false,
          Error: true,
          Message: 'Password Incorrect',
        });
      }
      const token = jwt.sign(
        {
          userId: oldUser._id,
          userName: oldUser.username,
          userRole: oldUser.role,
        },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      console.log('token', token);
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        userName: oldUser.username,
        userRole: oldUser.role,
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'All field are required',
      });
    }
  } catch (error) {
    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Internal Server Error',
      ErrorMessage: error.message,
    });
  }
});

// flutter test
LoginRouter.get('/profile/:id', (req, res) => {
  // console.log(req.userData);
  const id = req.params.id;
  console.log(id);
  RegisterData.aggregate([
    {
      $lookup: {
        from: 'login_tbs',
        localField: 'login_id',
        foreignField: '_id',
        as: 'result',
      },
    },
    {
      $unwind: {
        path: '$result',
      },
    },
    {
      $match: { login_id: new mongoose.Types.ObjectId(id) },
    },
    {
      $group: {
        _id: '$_id',
        name: {
          $first: '$name',
        },
        phone: {
          $first: '$phone',
        },
        email: {
          $first: '$email',
        },
        username: {
          $first: '$result.username',
        },
        password: {
          $first: '$result.password',
        },
      },
    },
  ])
    .then((data) => {
      console.log(data);
      return res.status(200).json({
        success: true,
        error: false,
        data: data, // data
      });
    })
    .catch((err) => console.log(err));
});

module.exports = LoginRouter;

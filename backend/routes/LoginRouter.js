const express = require('express');
const loginSchema = require('../models/loginSchema');
const LoginRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

LoginRouter.post('/', async (req, res) => {
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
    });
  }
});

module.exports = LoginRouter;

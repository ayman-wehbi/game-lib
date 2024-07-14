const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', registerPOST);
async function registerPOST(req, res) {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  res.json('Account Created');
}

router.post('/login', loginPOST);
async function loginPOST(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    res.json('Invalid email');
  } else if (user.password !== password) {
    res.json('Invalid password');
  } else {
    const payload = { subject: user._id };
    const token = jwt.sign(payload, 'secretKey');
    res.json({ message: 'Login Success', token });
  }
}

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }
  const payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }
  req.userId = payload.subject;
  next();
}

module.exports = router;

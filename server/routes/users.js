'use strict';

const express = require('express');
const axios = require('axios');
const router = express.Router();

const axiosInstance = axios.create({ baseURL: 'https://randomuser.me/api/' });

router.get('/:size', async (req, res, next) => {
  try {
    const usersResult = await axiosInstance.get('/', {
      params: {
        inc: 'picture,login,email,gender',
        results: req.params.size,
        seed: 'abc'
      }
    });

    const users = usersResult.data.results.map(user => ({
      avatar: user.picture.medium,
      username: user.login.username,
      email: user.email,
      gender: user.gender
    }));

    return res.json(users);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

// jshint esversion: 9

const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const date = require('../utils/date');

router.get('/', (req,res) => {
  if(req.cookies.auth_token) {
    res.render('index', {
      btnOne: 'Account',
      btnOneLink: '/users/me',
      btnTwo: 'Sign Out',
      btnTwoLink: '',
    });
  } else {
    res.render('index', {
      btnOne: 'Sign In',
      btnOneLink: '/users/login',
      btnTwo: 'Sign Up',
      btnTwoLink: '/users/register'
    });
  }
});

router.get('/users/login', (req,res) => {
  res.render('login', {
    message: '',
    btnOne: 'Sign In',
    btnOneLink: '/users/login',
    btnTwo: 'Sign Up',
    btnTwoLink: '/users/register'
  });
});

router.get('/users/register', (req,res) => {
  res.render('register', {
    message: '',
    btnOne: 'Sign In',
    btnOneLink: '/users/login',
    btnTwo: 'Sign Up',
    btnTwoLink: '/users/register'
  });
});

router.get('/users/tasks', auth, (req, res) => {
  res.render('tasks', {
      date: date.getDate(),
      btnOne: 'Account',
      btnOneLink: '/users/me',
      btnTwo: 'Sign Out',
      btnTwoLink: ''
  });
});

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;

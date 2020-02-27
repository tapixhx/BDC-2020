//requiring express
const express = require('express');

//requiring user and event model
const User = require('../models/user');

//requiring feed controller
const feedController = require('../controllers/register');

//requiring validation modules
const { body } = require('express-validator');

//router defined in express
const router = express.Router();

router.post('/register',
[
    
    body('name')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([A-z]+[ ]?[A-z]+[ ]?[A-z]+)$/, "i")
    ,
    body('student_no')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([1][6-9][0-9]{5}D?)$/, "i")
        .custom(value => {
            return User.findOne({ student_no: value }).then(user => {
              if (user) {
                return Promise.reject('Student number already exists');
              }
            });
          })
        ,
    body('course')
        .trim()
        .not()
        .isEmpty()
        .custom((value) => {
            if (value === 'B.Tech' || value === 'MCA' || value === 'MBA')
                return true;
            else {
            throw new Error('Invalid course');}
        })
        ,
    body('year')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([1-4]{1})$/, "i"),
    body('blood_group')
        .trim()
        .not()
        .isEmpty()
        .custom((value) => {
            if (value === 'A+' || value === 'A-' || value === 'B+' || value === 'B-' ||value === 'AB+' || value === 'AB-' ||
            value === 'O+' || value === 'O-' || value === "Don't Know")
                return true;
            else {
            throw new Error('Invalid blood group');}
        })
        ,
    body('gender')
        .trim()
        .not()
        .isEmpty()
        .custom((value) => {
            if (value === 'Male' || value === 'Female')
                return true;
            else {
            throw new Error('Invalid gender choice');}
        })
        ,
    body('hosteller')
        .trim()
        .not()
        .isEmpty()
        .custom((value) => {
            if (value === 'Yes' || value === 'No')
                return true;
            else {
            throw new Error('Invalid hostel choice');}
        })
        ,
    body('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail()
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
              if (user) {
                return Promise.reject('E-mail address already exists');
              }
            });
          })
        ,
    body('contact_no')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([6-9][0-9]{9})$/, "i")
        .custom(value => {
            return User.findOne({ contact_no: value }).then(user => {
              if (user) {
                return Promise.reject('Contact number already exists');
              }
            });
          })
        ,
]
    , feedController.registerUser
    )

module.exports = router;
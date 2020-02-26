const express = require('express');
//requiring user and event model
const User = require('../models/user');

const nodeMailer = require('nodemailer');
//mail configurations
const transporter = nodeMailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'bdc.akgec@gmail.com', 
        pass: 'silivein'
    }
}); 

const messages = [];

//requiring validation modules
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

//router defined in express
const router = express.Router();

// const regex = new Regex(/^([1][6-9][0-9]{5})/);

router.post('/register',
[
    body('name')
        .trim()
        .not()
        .isEmpty()
        .matches(/^[A-z ]+$/, "i")
    ,
    body('student_no')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([1][6-9][0-9]{5}D?)$/, "i")
    ,
    body('course')
        .trim()
        .not()
        .isEmpty(),
    body('year')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([1-4]{1})$/, "i"),
    body('blood_group')
        .trim()
        .not()
        .isEmpty(),
    body('gender')
        .trim()
        .not()
        .isEmpty(),
    body('hosteller')
        .trim()
        .not()
        .isEmpty(),
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('contact_no')
        .trim()
        .not()
        .isEmpty()
        .matches(/^([6-9][0-9]{9})$/, "i"),
    ],
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const error = new Error("Validation failed, entered data is incorrect.");
            error.statusCode = 422;
            throw error;
            }
        
        const name = req.body.name;
        const student_no = req.body.student_no;
        const course = req.body.course;
        const year = req.body.year;
        const blood_group = req.body.blood_group;
        const gender = req.body.gender;
        const hosteller = req.body.hosteller;
        const email = req.body.email;
        const contact_no = req.body.contact_no;

        // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        //     const error = new Error("Please select captcha");
        //     error.statusCode = 409;
        //     throw error;
        //   }
        //   const secretKey = "--paste your secret key here--";
        //   const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        //   request(verificationUrl,function(error,response,body) {
        //     body = JSON.parse(body);
        //     if(body.success !== undefined && !body.success) {
        //       const error = new Error("Failed captcha verification");
        //       error.statusCode = 409;
        //       throw error;
        //     }
        // })
            const user = new User({
                name: name,
                student_no: student_no,
                course: course,
                year: year,
                blood_group: blood_group,
                gender: gender,
                hosteller: hosteller,
                email: email,
                contact_no: contact_no
            })
                user.save();
                res.status(201).json({
                message: 'User saved'
                })

                const message = {
                    to: email,         // List of recipients
                    from: 'bdc.akgec@gmail.com', // Sender address
                    subject: 'Registered for BDC', // Subject line
                    html: `<h1>Hi ${name} !. You have successfully registered for BDC</h1>` // Plain text body
                };

                messages.push(message);

                while (transporter.isIdle() && messages.length) {
                    transporter.sendMail(messages.shift(), function(err, info) {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log(info);
                        }
                    });
                }

                console.log(messages)
                
        //   });
    }
);

module.exports = router;
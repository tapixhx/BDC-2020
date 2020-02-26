//requiring user model
const User = require('../models/user');

const config = require('../util/config');

const messages = [];

const nodeMailer = require('nodemailer');
//mail configurations
const transporter = nodeMailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: config
}); 

const { validationResult } = require('express-validator');

const request = require('request');

require('dotenv').config()

exports.registerUser = (req, res, next) => {
       
    const name = req.body.name;
    const student_no = req.body.student_no;
    const course = req.body.course;
    const year = req.body.year;
    const blood_group = req.body.blood_group;
    const gender = req.body.gender;
    const hosteller = req.body.hosteller;
    const email = req.body.email;
    const contact_no = req.body.contact_no;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
        }

    // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //     const error = new Error("Please select captcha");
    //     error.statusCode = 409;
    //     throw error;
    //     }
    //     const secretKey = process.env.secretKey;
    //     const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //     request(verificationUrl,function(error,response,body) {
    //     body = JSON.parse(body);
    //     if(body.success !== undefined && !body.success) {
    //         const error = new Error("Failed captcha verification");
    //         error.statusCode = 409;
    //         throw error;
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

}




//requiring user model
const User = require('../models/user');

const path = require('path');

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

        const handleSend = (req, res) => {
            const secret_key = process.env.secretKey;
            const token = req.body.token;
            const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
        
            fetch(url, {
                method: 'post'
            })
                .then(response => response.json())
                .then(google_response => res.json({ google_response }))
                .catch(error => res.json({ error }));
        };

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
                attachments: [{
                    filename: 'silogo.png',
                    path: path.join(__dirname, '../', '/images/silogo.png'),
                    //path:  __dirname +'../images/silogo.png',
                    cid: 'logo'
                }],
                html: `<html>
                <head>
                    <title></title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
                
                </head>
                <body>
                <div >
                    <div class="row no-gutters">
                        <div class="col-12">
                            <p  style="font-family: 'Montserrat black';font-size:2.5em;padding:20px;background:radial-gradient(ellipse at center, rgba(26,0,0,1) 50%, rgba(0,0,0,1) 100%) no-repeat fixed center;color:#fff;text-align:center; ">BLOOD DONATION CAMP 2019</p>
                        </div>
                        <div class="col-12">
                            <div class="container">
                             <div  style="padding:15px;padding-bottom: 50px;text-align: center;">
                                 <h2 style="font-weight: bold;padding-top: 4px;padding-bottom: 4px;">Hello ${name} </h2>
                                 <h3  style="font-weight:bold;color:rgb(30,0,0);font-size:2em;">THANK YOU FOR REGISTRATION</h3>
                                 <p>You have been succesfully registered for blood donation camp.<br>
                                 You will be notified further for slot</p>
                             </div>
                             <hr style="border:1px solid #000;">
                         </div>
                        </div>
                        <div class="col-12" >
                            <div style="text-align: center;">
                                <p style="color:rgb(26,0,0);font-size: 1.5em;font-weight: bold;">Regards: SOFTWARE INCUBATOR</p>
                                <img src="cid:logo" height="28px" width="28px" >
                                <p>This is system generated mail, please do not reply </p>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
                </html>`
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




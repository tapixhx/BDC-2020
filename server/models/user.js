const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    student_no: {
        type: String,
        required: true
      },
    course: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
      },
    blood_group: {
        type: String,
        required: true
      },
    gender: {
        type: String,
        required: true
      },
    hosteller: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    contact_no: {
        type: String,
        required: true
      }

})

module.exports = mongoose.model('User', userSchema);
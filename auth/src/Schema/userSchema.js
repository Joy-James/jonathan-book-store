const joi = require('joi');



const new_User_Schema = joi.object({
    FullName: joi.string()
                 .min(3)
                 .required(),
    Address: joi.string()
                .required()
                .min(5)
                .max(30),

    ContactNumber: joi.string()
                      .required()
                      .max(8)
                      .min(8),
    Password: joi.string()
                 .required()
                 .min(6)
                 .max(30),
    c_password: joi.ref('Password')

}).with('Password', 'c_password')


module.exports = { new_User_Schema }
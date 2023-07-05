const {createTransport} = require("nodemailer");
require("dotenv").config()

const email_config = require("../config/emailConfig")

const message_options = {
    to: ["muchuicollins56@gmail.com", "ndigithejohn@gmail.com", "kiruiaaron471@gmail.com", "samgitonga66@gmail.com", "jonathan.mwaniki@thejitu.com"],
    from: process.env.EMAIL_USER,
    subject: "Email testing || Send from Nodemailer",
    text: "Yaay this works!"
    
}



async function sendMail(){
    
    try {
        const transporter = createTransport(email_config);
        let results = await transporter.sendMail(message_options)
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail

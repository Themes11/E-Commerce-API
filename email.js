const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'josefina.reichel1@ethereal.email',
        pass: 'XvCk6j6TSf8NUH1jv5'
    }
});

const sendEmail = async (email, name, port, code) => {
    await transporter.sendMail({
        from: "'no reply' <ooohte1111@gmail.com>",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href='http://localhost:${port}/api/v1/auth/confirm/${code}'> Click here</a>
            </div>`,
      })
      
};

module.exports = {sendEmail}
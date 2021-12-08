const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({ req }) {
    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let smtpTransport = nodemailer.createTransport({
        secure: true, // use TLS
        port: 465,
        host: 'milkbardesigners.com', // mail.tryzna.pl // milkbardesigners.com //qubrick.io // de3.fcomet.com // mail.surtarang.space
        auth: {
            user: 'info@milkbardesigners.com', // info@surtarang.space // info@milkbardesigners.com // info@qubrick.io
            pass: process.env.EMAIL_PASS // add as Server ENV

        },
        // tls: {
        //     // do not fail on invalid certs
        //     rejectUnauthorized: false
        //   }
    });

    // send mail with defined transport object
    let info = await smtpTransport.sendMail({
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        // text: req.body.subject, // plain text body
        html: req.body.html, // html body
    });
    smtpTransport.close()
    return info
}

module.exports = { sendEmail }


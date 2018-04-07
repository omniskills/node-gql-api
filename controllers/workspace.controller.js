import Workspace from '../models/workspace';
import User from '../models/user';
import nodemailer from 'nodemailer';

const controller = {};

controller.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({});
    res.send(workspaces);
  } catch (err) {
    res.send('Got error in getAll');
  }
};

controller.sendEmail = async (req, res) => {
  const { email } = req.body;

  try {
    console.log(email);
    const user = await User.findOne({
      email,
    }).populate('workspace');

    console.log(user);

    const link = `http://localhost:8000/${user.workspace.displayName}`;

    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: 'Workspace link', // Subject line
            text: link, // plain text body
            html: '<b>'+link+'</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    res.send('Email sent successfully');
  } catch (err) {
    console.log(err);
    res.send('Cannot find workspace');
  }
};

export default controller;

import nodemailer from "nodemailer";


const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ijazmahhnoor206@gmail.com", // replace with your email
      pass: "gtlx bzte dvdh idps ", // replace with your password
    },
  });

  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "ijazmahhnoor206@gmail.com", // replace with your email
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
};

export default { sendEmail };

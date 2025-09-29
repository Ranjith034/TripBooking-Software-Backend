// const nodemailer = require("nodemailer");


// const mailsender = async (email, name) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMA_USER, // your gmail address from .env
//         pass: process.env.APP_PASS, // your app password from .env
//       },
//     });

//     const mailcontent = {
//       from: `"Ranjith" <${process.env.EMA_USER}>`, // better: show name + email
//       to: "ranjithcheck@gmail.com",
//       subject: "Booking Confirmation ✅",
//       text: `Hi ${name}, your booking has been created successfully!`,
//     };

//     await transporter.sendMail(mailcontent);

//     console.log("Mail sent successfully ✅");
//   } catch (error) {
//     console.log(`Mail error: ${error}`);
//   }
// };

// module.exports=mailsender
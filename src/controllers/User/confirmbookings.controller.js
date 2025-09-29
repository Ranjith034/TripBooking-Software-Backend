const Bookings = require("../../models/User/conformbookings.models");
// const mailsender = require("../../utils/sendmail")
const nodemailer = require("nodemailer")

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
//       from: `"Guru Holidays" <${process.env.EMA_USER}>`, // better: show name + email
//       to: email,
//       subject: "Booking Confirmation ✅",
//       text: `Hi ${name}, Your Booking has Confirm !`,
//     };

//     await transporter.sendMail(mailcontent);

//     console.log("Mail sent successfully ✅");
//   } catch (error) {
//     console.log(`Mail error: ${error}`);
//   }
// };

const mailsender = async (email, name, packagename, date) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMA_USER,
        pass: process.env.APP_PASS,
      },
    });

    const mailcontent = {
      from: `"Guru Holidays" <${process.env.EMA_USER}>`,
      to: email,
      subject: "Booking Confirmation ✅",
      html: `
      <div style="background-color:#f4f4f4; padding:20px; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px;">
          <tr>
            <td style="padding:20px; text-align:left; font-size:16px; color:#000;">
              Hi <b>${name}</b>, Your Booking Has Been Confirmed ✅
            </td>
          </tr>

          <tr>
            <td style="padding:10px 20px; font-size:14px; color:#333;">
              <p><b style="color:#6A1B9A;">Package Name:</b> ${packagename || "-"}</p>
              <p><b style="color:#D32F2F;">Date:</b> ${date || "-"}</p>
              
            </td>
          </tr>

          <tr>
            <td style="padding:20px; text-align:center;">
              <img src="http://localhost:7000/static/logo.png" alt="Guru Holidays" width="80" style="border-radius:50%; background:white; padding:5px;" />
              <p style="font-size:12px; color:#555; margin-top:10px;">Verified By Guru Holidays</p>
            </td>
          </tr>
        </table>
      </div>
      `,
    };

    await transporter.sendMail(mailcontent);

    console.log("Mail sent successfully ✅");
  } catch (error) {
    console.log(`Mail error: ${error}`);
  }
};



const createconfirmBooking = async (req, res) => {
  try {
    // get userId from token (middleware added it)
    
    const booking = await Bookings.create({
      ...req.body,
    
    });

    const { email, name ,packagename, date } = req.body;

    if (email && name && packagename , date) {
      await mailsender(email, name ,packagename, date);
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: err.message,
    });
  }
};


// 📌 Get booking by ID (GET /:id)
const getconfirmBookingById = async (req, res) => {
  try {
    const {userId} = req.query; // from token middleware

    const bookings = await Bookings.find({ userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: err.message,
    });
  }
};


// 📌 Get all bookings (GET)
const getAllconfirmBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: err.message,
    });
  }
};

module.exports = {
  createconfirmBooking,
  getconfirmBookingById,
  getAllconfirmBookings,
};

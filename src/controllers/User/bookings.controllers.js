const Bookings = require("../../models/User/booking.models");
// const mailsender = require("../../utils/sendmail")
const nodemailer = require("nodemailer")

// const mailsender = async (email, name ,phone) => {
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
//       to: "ranjithravies8@gmail.com",
//       subject: "Booking Confirmation ✅",
//       text: `Hi Admin ${name}, has waiting for your approve !`,
      
//     };

//     await transporter.sendMail(mailcontent);

//     console.log("Mail sent successfully ✅");
//   } catch (error) {
//     console.log(`Mail error: ${error}`);
//   }
// };

const mailsender = async (email, name, phone) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMA_USER, // your gmail address from .env
        pass: process.env.APP_PASS, // your app password from .env
      },
    });

    const mailcontent = {
      from: `"Guru Holidays" <${process.env.EMA_USER}>`,
      to: "manibharathisurya2@gmail.com", // you can pass `email` here instead of hardcoding
      subject: "Booking Confirmation ✅",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background: #ffc800ff; padding: 15px; text-align: center;">
            <h2 style="margin: 0; color: #000;">Guru Holidays</h2>
          </div>

          <!-- Body -->
          <div style="padding: 20px;">
            <h3 style="color: #333;">Hi <span style="color:#007BFF;">Admin</span>,</h3>
            <p style="font-size: 16px; color: #555;">
              You have received a new booking request. Please review and approve it.
            </p>

            <table style="width:100%; margin-top:15px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color:#333;">Customer Name:</td>
                <td style="padding: 8px; color:#555;">${name}</td>
              </tr>
              <tr style="background:#f9f9f9;">
                <td style="padding: 8px; font-weight: bold; color:#333;">Customer Email:</td>
                <td style="padding: 8px; color:#555;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color:#333;">Customer Phone:</td>
                <td style="padding: 8px; color:#555;">${phone}</td>
              </tr>
            </table>

            <p style="margin-top:20px; font-size:14px; color:#888;">
              Please login to the admin dashboard to confirm the booking.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color:#666;">
            © ${new Date().getFullYear()} Guru Holidays. All rights reserved.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailcontent);
    console.log("Mail sent successfully ✅");
  } catch (error) {
    console.log(`Mail error: ${error}`);
  }
};


const createBooking = async (req, res) => {
  try {
    // get userId from token (middleware added it)
    const userId = req.userId;

    console.log(userId, "userId");
    

    // include userId when creating booking
    const booking = await Bookings.create({
      ...req.body,
      userId: userId,
    });

    const { email, name ,phone } = req.body;

    if (email && name) {
      await mailsender(email, name, phone);
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
const getBookingById = async (req, res) => {
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
const getAllBookings = async (req, res) => {
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

const updateBooking = async (req, res) => {
  try {
    const { _id } = req.query; // booking ID from URL
    const updateData = req.body;

    const updatedBooking = await Bookings.findByIdAndUpdate(
       _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: err.message,
    });
  }
};


module.exports = {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking
};

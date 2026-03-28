
import db from "../../config/db.js";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import axios from "axios";

/* ================= EMAIL SETUP ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= CONTROLLER ================= */
export const submitContact = async (req, res) => {
  const {
    full_name,
    email,
    mobile_number,
    whatsapp_number,
    selected_plan,
    address,
  } = req.body;

  try {
    /* ================= FETCH PLANS FROM API ================= */
    const plansRes = await axios.get("http://localhost:5000/api/packages");
    const plans = plansRes.data.filter((p) => p.status === 1);

    if (!selected_plan) {
  return res.status(400).json({ message: "Plan not selected ❌" });
}
    
    // const matchedPlan = plans.find(
    //   (p) => p.package_name.toLowerCase() === selected_plan.toLowerCase()
    // );

const matchedPlan = plans.find(
  (p) =>
    p.package_name?.toLowerCase() === selected_plan?.toLowerCase()
);



    const amount = matchedPlan ? matchedPlan.price : 0;

    /* ================= GENERATE QR ================= */
    const upiLink = `upi://pay?pa=gk9881748@okaxis&am=${amount}&cu=INR&tn=${selected_plan}`;

    let qrImage;
    try {
      qrImage = await QRCode.toDataURL(upiLink);
      console.log("QR Generated ✅");
    } catch (err) {
      console.log("QR Generation Error:", err);
      return res.status(500).json({ message: "QR Generation Failed" });
    }

    /* ✅ Base64 → Buffer (IMPORTANT) */
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(base64Data, "base64");

    /* ================= INSERT INTO DB ================= */
    const query = `
      INSERT INTO contacts_table
      (full_name, email, mobile_number, whatsapp_number, selected_plan, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [full_name, email, mobile_number, whatsapp_number, selected_plan, address],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Database Error" });
        }

        /* ================= ADMIN EMAIL ================= */
        const adminMail = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New Contact Form Submission",
          html: `
            <h2>New Contact Request</h2>
            <p><b>Name:</b> ${full_name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mobile:</b> ${mobile_number}</p>
            <p><b>WhatsApp:</b> ${whatsapp_number}</p>
            <p><b>Plan:</b> ${selected_plan}</p>
            <p><b>Address:</b> ${address}</p>
            <p><b>Amount:</b> ₹${amount}</p>
          `,
        };

        /* ================= USER EMAIL ================= */
        const userMail = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "We received your request ",

          html: `
            <h2>Hello ${full_name},</h2>
            <p>Thank you for contacting us.</p>
            <p>We have received your request and our team will contact you soon.</p>

            <hr/>

            <h3>Your Submitted Details:</h3>
            <p><b>Name:</b> ${full_name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mobile:</b> ${mobile_number}</p>
            <p><b>WhatsApp:</b> ${whatsapp_number}</p>
            <p><b>Plan:</b> ${selected_plan}</p>
            <p><b>Amount:</b> ₹${amount}</p>
            <p><b>Address:</b> ${address}</p>

            <hr/>

            <h3>Payment</h3>
            <p>Please scan the QR code below to complete your payment:</p>

            <img src="cid:qrcode" width="200"/>
          

            <br/><br/>
            <p>Regards: Golu Kumar,<br/>Team: RegalRentals</p>
          `,

          attachments: [
            {
              filename: "qr.png",
              content: qrBuffer,
              cid: "qrcode",
            },
          ],
        };

        /* ================= SEND EMAILS ================= */
        transporter.sendMail(adminMail, (error) => {
          if (error) {
            console.log("Admin mail error:", error);
            return res.status(500).json({ message: "Email Error (Admin)" });
          }

          transporter.sendMail(userMail, (error2) => {
            if (error2) {
              console.log("User mail error:", error2);
            }

            res.json({ message: "Form submitted successfully ✅" });
          });
        });
      }
    );
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};














//   here is new api - based on most selected plan then auto add tag popular  today is : 24-03-2026 ====================


export const getPopularPlan = (req, res) => {
  const query = `
    SELECT selected_plan, COUNT(*) as total
    FROM contacts_table
    GROUP BY selected_plan
    ORDER BY total DESC
    LIMIT 1
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error" });
    }

    if (result.length === 0) {
      return res.json({ selected_plan: null }); // ✅ safe
    }

    res.json(result[0]);
  });
};
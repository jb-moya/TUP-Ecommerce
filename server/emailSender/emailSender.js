import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jbvhert.moya@tup.edu.ph", // Your email address
        pass: "mpyq sbdb ktry kjwf",
    },
    tls: {
        rejectUnauthorized: false, // Ignore SSL verification (not recommended for production)
    },
});

export const sendEmail = async (req, res, mailOptions) => {
    try {
        // Step 3: Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: "Email sent successfully!" });
        });
    } catch (error) {
        console.log(error);
    }
};



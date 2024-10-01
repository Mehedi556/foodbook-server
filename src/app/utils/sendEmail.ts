import nodemailer from "nodemailer"
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === 'production',
    auth: {
        user: "salam.mehedi99@gmail.com",
        pass: "cnso deie yape azsw",
    },
});

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - FoodBook</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #FFA500;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            color: #fff;
            text-align: center;
        }
        .email-body {
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }
        .email-body p {
            margin-bottom: 20px;
        }
        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
        }
        .button {
            background-color: #FFA500;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
        .button:hover {
            background-color: #FF7F00;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>FoodBook</h1>
            <h2>Password Reset Request</h2>
        </div>
        <div class="email-body">
            <p>Hi,</p>
            <p>We received a request to reset your password for your FoodBook account. Please click the button below to reset your password:</p>
            <p>
                <a href="${html}" class="button">Reset Password</a>
            </p>
            <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
            <p>Thank you,<br>The FoodBook Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 FoodBook. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>

`

await transporter.sendMail({
    from: 'salam.mehedi99@gmail.com',
    to: to,
    subject: "FoodBook reset password request!",
    text: "Forget password change request.",
    html:htmlTemplate ,
});

}
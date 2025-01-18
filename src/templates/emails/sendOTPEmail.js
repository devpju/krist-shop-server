const sendOTPEmailTemplate = {
  html: (otp, secondsTimeExpiration, supportLink) => {
    return `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
                <style>
                    /* Global Styles */
                    body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f7fa;
                    color: #333333;
                    }
                    .email-container {
                    background-color: #ffffff;
                    border-radius: 8px;
                    max-width: 600px;
                    margin: 40px auto;
                    padding: 30px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    }

                    /* Header Styles */
                    .email-header {
                    font-size: 28px;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 20px;
                    }

                    /* OTP Code Styling */
                    .otp-code {
                    font-size: 40px;
                    font-weight: bold;
                    color: #4caf50;
                    background-color: #e8f5e9;
                    border-radius: 8px;
                    padding: 20px 30px;
                    display: inline-block;
                    margin-top: 20px;
                    }

                    /* Body Styles */
                    .email-body {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #6b7280;
                    margin-top: 30px;
                    }

                    .email-body p {
                    margin-bottom: 20px;
                    }

                    /* Footer Styles */
                    .footer {
                    font-size: 14px;
                    color: #9ca3af;
                    margin-top: 30px;
                    text-align: center;
                    }
                    .footer a {
                    color: #1e8e3e;
                    text-decoration: none;
                    }
                    .footer a:hover {
                    text-decoration: underline;
                    }

                    /* Responsive Styles */
                    @media (max-width: 600px) {
                    .email-container {
                        padding: 20px;
                    }
                    .otp-code {
                        font-size: 36px;
                        padding: 15px 25px;
                    }
                    }
                </style>
                </head>
                <body>

                <div class="email-container">
                    <div class="email-header">
                    OTP Verification Code
                    </div>
                    <div class="email-body">
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <div class="otp-code">
                        ${otp}
                    </div>
                    <p>Please use this code to complete your verification. This OTP is valid for the next ${secondsTimeExpiration} minutes.</p>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    </div>
                    <div class="footer">
                    <p>&copy; 2025 Your Company. All Rights Reserved.</p>
                    <p>If you need assistance, visit <a href=${supportLink} target="_blank">our support page</a>.</p>
                    </div>
                </div>

                </body>
                </html>
                `;
  },
  text: (otp, secondsTimeExpiration) => {
    return `
            Hello,

            Your One-Time Password (OTP) for verification is:

            ${otp}

            Please use this OTP to complete your verification. This OTP is valid for the next ${secondsTimeExpiration} minutes.

            If you did not request this, please ignore this email.

            Thank you,
            Your Company
            `;
  }
};

export default sendOTPEmailTemplate;

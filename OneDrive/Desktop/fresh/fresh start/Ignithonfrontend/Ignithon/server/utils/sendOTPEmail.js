const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


async function sendOTPEmail(to, otp) {
  console.log(`📧 Attempting to send OTP to: ${to}`);
  console.log(`🔐 OTP Code: ${otp}`);
  console.log(`📮 From Email: ${process.env.EMAIL_USER}`);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "HealthGuide - Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #4F46E5; text-align: center; margin-bottom: 20px;">
            🏥 HealthGuide Verification
          </h2>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Hello! Your verification code for HealthGuide is:
          </p>
          <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="margin: 0; font-size: 32px; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            This code expires in 10 minutes. Don't share it with anyone.
          </p>
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="font-size: 12px; color: #999;">
              © 2025 HealthGuide - Your AI-powered health companion
            </p>
          </div>
        </div>
      </div>
    `,
  };
  
  try {
    console.log('🔄 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${to}`);
    console.log(`📋 Message ID: ${info.messageId}`);
    console.log(`📊 Response: ${info.response}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
    console.error('📧 Email config check:');
    console.error(`   - EMAIL_USER: ${process.env.EMAIL_USER ? 'Set' : 'Missing'}`);
    console.error(`   - EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Missing'}`);
    return { success: false, error: err.message };
  }
}

module.exports = sendOTPEmail;

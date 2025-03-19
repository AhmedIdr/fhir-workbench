const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { huggingFaceRepo } = JSON.parse(event.body);

    // Validate the inputs
    if (!huggingFaceRepo || !huggingFaceRepo.startsWith('https://huggingface.co/')) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Invalid HuggingFace repository URL' })
      };
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Default email recipient
    const DEFAULT_RECIPIENT = process.env.DEFAULT_RECIPIENT_EMAIL || 'ai.yaghir@gmail.com';

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: DEFAULT_RECIPIENT,
      subject: 'FHIR Leaderboard Model Submission',
      text: `New model submission:\n\nHuggingFace Repository: ${huggingFaceRepo}\n\nSubmitted at: ${new Date().toISOString()}`,
      html: `
        <h2>New FHIR Leaderboard Model Submission</h2>
        <p><strong>HuggingFace Repository:</strong> <a href="${huggingFaceRepo}">${huggingFaceRepo}</a></p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return { 
      statusCode: 200, 
      headers: {
        "Access-Control-Allow-Origin": "*", // For CORS support
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error submitting model:', error);
    return { 
      statusCode: 500, 
      headers: {
        "Access-Control-Allow-Origin": "*", // For CORS support
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ error: 'Failed to submit model' })
    };
  }
}; 
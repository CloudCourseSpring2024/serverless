import mailgun from 'mailgun-js';

// Initialize Mailgun client
const mg = mailgun({ apiKey: 'f0f3d105e852b717d8d62aac1971863a-f68a26c9-95598776', domain: 'mg.spring2024cc.me' });

// Function to send verification email
const sendVerificationEmail = async (data) => {
  const emailData = {
    from: 'webapp account creation <no-reply@mg.spring2024cc.me>',
    to: data.username,
    subject: 'Verify your email address',
    text: `Click the following link to verify your email address: http://spring2024cc.me:3000/verify/${data.id}`,
  };

  try {
    await mg.messages().send(emailData);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Cloud Function to handle new user events
export const handleNewUser = async (data, context) => {
  try {
    const userData = JSON.parse(Buffer.from(data.data, 'base64').toString());

    // Send verification email
    await sendVerificationEmail(userData);

    // Track email in database
    // await trackEmailsInDatabase(userData);

    console.log('Verification email sent and tracking data stored successfully.');
  } catch (error) {
    console.error('Error handling new user:', error);
    throw error;
  }
};

// Path: backend\utils\googleConfig.js
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Redirect URI must match what you set in Google Cloud Console.
// For 'postmessage' flow (which useGoogleLogin uses), use 'postmessage'.
exports.oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
);
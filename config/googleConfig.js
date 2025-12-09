// Path: backend\config\googleConfig.js
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// **NOTE:** Using the live domain for production environment
// Live Website: https://bookmyridetoday.co.in/
exports.oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    // लाइव HTTPS डोमेन और सही कॉलबैक पाथ का उपयोग करें
    "https://bookmyridetoday.co.in/auth/google/callback" 
);
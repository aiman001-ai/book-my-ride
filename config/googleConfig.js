// Path: backend\config\googleConfig.js
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// 1. यदि आप react-google-login/gapi/Google Sign-In API का उपयोग कर रहे हैं:
const REDIRECT_URI = 'postmessage'; 
// 2. या कभी-कभी, यह आपका Frontend बेस URL होता है (जाँच करें!)
// const REDIRECT_URI = 'https://bookmyridetoday.co.in';

exports.oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI // इसे 'postmessage' पर सेट करें (सबसे संभावित समाधान)
);

// 3. Google Console में Authorized Redirect URIs में भी 'postmessage' जोड़ें।
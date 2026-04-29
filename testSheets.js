const { google } = require('googleapis');
const fs = require('fs');

process.loadEnvFile('.env.local');

async function run() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.SHEET_ID;

  try {
    console.log("Fetching spreadsheet ID:", spreadsheetId);
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    console.log("--- SUCCESS! ---");
    console.log("Document Title:", meta.data.properties.title);
    console.log("Available Tabs:");
    meta.data.sheets.forEach(s => console.log(" - '" + s.properties.title + "'"));
  } catch (e) {
    console.error("--- ERROR ---");
    console.error("Message:", e.message);
    if (e.code === 404) {
      console.error("This 404 means either the ID is wrong, or the email hasn't been shared.");
    }
  }
}
run();

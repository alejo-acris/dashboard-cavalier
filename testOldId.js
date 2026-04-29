const { google } = require('googleapis');
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

  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: '1VAcYTDv_lBKJXNl9SIsRbf9c0pPT39MyGDHxEsVMhuo' });
    console.log("SUCCESS OLD ID:", meta.data.sheets.map(s => s.properties.title));
  } catch(e) {
    console.error("FAILED OLD ID:", e.message);
  }
}
run();

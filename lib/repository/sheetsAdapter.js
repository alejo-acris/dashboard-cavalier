import { google } from 'googleapis';

function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

export const sheetsAdapter = {
  getDashboardData: async (locationId) => {
    try {
      const sheets = getGoogleSheetsClient();
      const spreadsheetId = process.env.SHEET_ID || process.env.GOOGLE_SHEET_ID;

      const configResponse = await sheets.spreadsheets.values.get({ 
        spreadsheetId, 
        range: "'Control y uso'!A:Z" 
      }).catch(e => {
        console.error("Google Sheets API error:", e);
        return null;
      });

      if (!configResponse || !configResponse.data.values) {
        return getMockData(locationId);
      }

      const configRows = configResponse.data.values;
      
      // Imprimir los headers para ver la estructura real en la consola
      console.log("SHEET HEADERS:", configRows[0]);
      
      const clientRow = configRows.slice(1).find(row => 
        row[0]?.toString().trim().toLowerCase() === locationId?.toString().trim().toLowerCase()
      );

      if (!clientRow) {
        throw new Error("Cliente no encontrado / Unauthorized");
      }

      // location_id(0) | business_name(1) | base_limit(2) | messages_consumed(3) | messages_limit(4) | extra_credits(5) | renewal_date(6) | status(7)
      const businessName = clientRow[1] || 'Sin Nombre';
      const baseLimit = parseInt(clientRow[2] || 0, 10);
      const consumed = parseInt(clientRow[3] || 0, 10);
      const limit = parseInt(clientRow[4] || 0, 10);
      const extraCredits = parseInt(clientRow[5] || 0, 10);
      const renewalDate = clientRow[6] || 'N/A';
      const statusFromSheet = clientRow[7] || "Active";
      
      const percentage = limit > 0 ? (consumed / limit) * 100 : 0;

      return {
        id: locationId,
        business_name: businessName,
        base_limit: baseLimit,
        extra_credits: extraCredits,
        messages_limit: limit,
        messages_consumed: consumed,
        renewal_date: renewalDate,
        status: statusFromSheet,
        percentage
      };

    } catch (error) {
      console.error("Sheets Adapter Error:", error);
      throw error;
    }
  },

  getExecutionHistory: async (locationId, days = 30) => {
    // El gráfico de barras mantiene datos mock por ahora
    return getMockHistoryData();
  }
};

// ==========================================
// MOCK DATA FALLBACK PARA PRUEBAS UI RÁPIDAS
// ==========================================
function getMockData(locationId) {
  return {
    id: locationId,
    business_name: "Acris Agency Mock Corp",
    messages_limit: 5000,
    messages_consumed: 4250,
    renewal_date: "2026-05-15",
    status: (4250/5000) * 100 > 90 ? "Blocked" : ((4250/5000) * 100 > 70 ? "Warning" : "Active"),
    percentage: 85
  };
}

function getMockHistoryData() {
  const data = [];
  const roles = ["Ventas_B2C", "Soporte_B2B", "LeadGen"];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    roles.forEach(role => {
      data.push({
        timestamp: d.toISOString(),
        date: d.toLocaleDateString(),
        agent: role,
        count: Math.floor(Math.random() * 50) + 10
      });
    });
  }
  return data;
}

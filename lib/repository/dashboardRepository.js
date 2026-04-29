import { DATA_SOURCE } from './dataSource.config';
import { sheetsAdapter } from './sheetsAdapter';
import { postgresAdapter } from './postgresAdapter';

const adapter = DATA_SOURCE === 'sheets' ? sheetsAdapter : postgresAdapter;

export const dashboardRepository = {
  getDashboardData: async (locationId) => {
    return await adapter.getDashboardData(locationId);
  },
  getExecutionHistory: async (locationId, days) => {
    return await adapter.getExecutionHistory(locationId, days);
  }
};

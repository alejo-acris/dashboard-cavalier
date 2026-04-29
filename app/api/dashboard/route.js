import { NextResponse } from 'next/server';
import { dashboardRepository } from '@/lib/repository/dashboardRepository';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('id');

    if (!locationId) {
      return NextResponse.json({ error: 'Missing location ID' }, { status: 400 });
    }

    const data = await dashboardRepository.getDashboardData(locationId);
    const history = await dashboardRepository.getExecutionHistory(locationId, 30);

    return NextResponse.json({ data, history }, { status: 200 });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

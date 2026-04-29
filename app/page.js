import UnauthorizedView from "@/components/UnauthorizedView";
import DashboardView from "./DashboardView"; // Cliente Component
import { dashboardRepository } from "@/lib/repository/dashboardRepository";

// Este es un Server Component
export default async function Home({ searchParams }) {
  const locationId = searchParams.id;

  if (!locationId) {
    return <UnauthorizedView />;
  }

  try {
    // Si la DB (Google Sheets real) falla, el repositorio devolverá el Mock (según programamos)
    const data = await dashboardRepository.getDashboardData(locationId);
    const history = await dashboardRepository.getExecutionHistory(locationId, 30);

    return <DashboardView locationId={locationId} initialData={{ data, history }} />;
  } catch (error) {
    console.error("Error fetching data for page:", error);
    return <UnauthorizedView />;
  }
}

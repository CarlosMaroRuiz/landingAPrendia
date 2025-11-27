import { useEffect } from 'react';
import { CardsDash, ChartDash } from "../components/organisms";
import { useAsync } from '../../../../common/iu/hooks';
import { getStats, getTopMunicipalities } from '../../services/dashboardService';

export const DashboardPage = () => {
  // Use useAsync for fetching stats
  const {
    execute: fetchStats,
    data: statsData
  } = useAsync(getStats);

  // Use useAsync for fetching top municipalities
  const {
    execute: fetchMunicipalities,
    data: municipalitiesData
  } = useAsync(getTopMunicipalities);

  useEffect(() => {
    fetchStats();
    fetchMunicipalities();
  }, [fetchStats, fetchMunicipalities]);

  // Extract stats with defaults
  const stats = {
    totalRegistros: statsData?.totalRegistros || 0,
    registrosAtendidos: statsData?.registrosAtendidos || 0,
    registrosNoAtendidos: statsData?.registrosNoAtendidos || 0
  };

  // Extract municipalities data
  const municipalities = municipalitiesData?.data || [];

  return (
    <div className="flex w-full flex-col gap-6">
      <CardsDash
        totalRegistros={stats.totalRegistros}
        registrosAtendidos={stats.registrosAtendidos}
        registrosNoAtendidos={stats.registrosNoAtendidos}
      />
      <ChartDash municipalitiesData={municipalities} />
    </div>
  );
};

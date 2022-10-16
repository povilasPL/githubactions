import React from 'react';

import { useSelector } from 'react-redux';

import { getKpiData } from './reducer';
import Kpi from './Kpi';

const Kpis = () => {
    const kpiData = useSelector(getKpiData);

    const kpisByType = kpiData.kpis.byType;
    const values = kpiData.values;
    const trackingFilters = kpiData.trackingFilters;

    return (
        <div>
            Branding Kpis:
            {kpisByType?.branding?.map((kpi: string) => (
                <div key={kpi}>
                   <Kpi kpi={kpi} value={values?.[kpi]?.value} trackingFilter={trackingFilters?.[kpi]?.id} />
                </div>
            ))}
            Performance Kpis:
            {kpisByType?.performance?.map((kpi: string) => (
                <div key={kpi}>
                    <Kpi kpi={kpi} value={values?.[kpi]?.value} trackingFilter={trackingFilters?.[kpi]?.id} />
                </div>
            ))}
        </div>
    )
}

export default Kpis;
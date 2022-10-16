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
                   <Kpi kpi={kpi} values={values} trackingFilters={trackingFilters} />
                </div>
            ))}
            Performance Kpis:
            {kpisByType?.performance?.map((kpi: string) => (
                <div key={kpi}>
                    <Kpi kpi={kpi} values={values} trackingFilters={trackingFilters} />
                </div>
            ))}
        </div>
    )
}

export default Kpis;
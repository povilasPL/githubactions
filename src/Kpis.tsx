import React from 'react';

import { useSelector } from 'react-redux';

import { getKpiData, kpisForBackEnd } from './reducer';
import Kpi from './Kpi';

const Kpis = () => {
    const { kpis: { byType }, values, trackingFilters } = useSelector(getKpiData);
    const saveVariables = useSelector(kpisForBackEnd);

    console.log(saveVariables);

    return (
        <div>
            Branding Kpis:
            {byType?.branding?.map((kpi: string) => (
                <div key={kpi}>
                   <Kpi kpi={kpi} values={values} trackingFilters={trackingFilters} />
                </div>
            ))}
            Performance Kpis:
            {byType?.performance?.map((kpi: string) => (
                <div key={kpi}>
                    <Kpi kpi={kpi} values={values} trackingFilters={trackingFilters} />
                </div>
            ))}
        </div>
    )
}

export default Kpis;
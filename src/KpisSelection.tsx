import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getKpiData, setKpiData } from './reducer';
import { mapKpiData } from './helpers';

const brandingList = ['videoCompletionRate', 'viewabilityRate', 'ecpmReach', 'ecpmViewable'];
const performanceList = ['ctr', 'ecpc', 'ecpa', 'roas'];

const KpisSelection: React.FC<any> = ({ selectedKpis }) => {
    const dispatch = useDispatch();
    const { values, trackingFilters } = useSelector(getKpiData);

    const [kpis, setKpis] = useState<any>([]);

    useEffect(() => {
        setKpis(selectedKpis)
    }, [selectedKpis])

    const handleSubmit = () => {
        const { kpisState, valuesState, trackingFiltersState } = mapKpiData(kpis, values, trackingFilters);

        dispatch(setKpiData({ kpis: kpisState, values: valuesState, trackingFilters: trackingFiltersState }))
    }

    const handleKpiCheck = (e: any, kpi: string) => {
        const checked = e.target.checked;

        if (checked) {
            setKpis([...kpis, kpi])
        } else {
            setKpis(kpis.filter((k: any) => k !== kpi))
        }
    }

    return (
        <div>
            <div>
                Branding kpis:
                {brandingList.map((kpi) => (
                    <div key={kpi}>
                        <input type="checkbox" checked={kpis.includes(kpi)} onChange={(e) => handleKpiCheck(e, kpi)} />
                        <label>{kpi}</label>
                    </div>
                ))}
            </div>
            <div>
                Performance kpis:
                {performanceList.map((kpi) => (
                    <div key={kpi}>
                        <input type="checkbox" checked={kpis.includes(kpi)} onChange={(e) => handleKpiCheck(e, kpi)} />
                        <label>{kpi}</label>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default KpisSelection;
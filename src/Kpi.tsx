import React, { useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { KPI_TYPES_MAP } from './helpers';
import { setKpiValue, setTrackingFilter } from './reducer';

interface KpiProps {
    kpi: string
    value: any
    trackingFilter: any
}

const Kpi: React.FC<KpiProps> = ({ kpi, value, trackingFilter }) => {
    const dispatch = useDispatch();

    const [val, setValue] = useState(KPI_TYPES_MAP[kpi] === 'rate' ? value * 100 : value);
    const [tf, setTfValue] = useState(trackingFilter);

    const updateState = useMemo(
        () =>
          debounce((action, payload) => {
            dispatch(action(payload))
          }, 500),
        []
      );
    
      const handleKpiValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    
        updateState(setKpiValue, { kpi, value: Number(e.target.value) / 100 });
      };


    const handleTrackingFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTfValue(e.target.value);

        updateState(setTrackingFilter, { kpi, value: e.target.value })
    };

    const shpouldIncludeTrackingFilter = kpi === 'ecpa' || kpi === 'roas';

    return (
        <div>
            <label htmlFor="kpi">{kpi}: </label>
            <input value={val} onChange={handleKpiValueChange} />
            { shpouldIncludeTrackingFilter && 
                <>
                    <label htmlFor="trackingFilter">Tracking filter: </label>
                    <input value={tf} onChange={handleTrackingFilterChange} />
                </>
                
            }
        </div>
    )
}

export default Kpi;
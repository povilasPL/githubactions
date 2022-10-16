import React, { useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { setKpiValue, setTrackingFilter } from './reducer';

interface KpiProps {
    kpi: string
    values: any
    trackingFilters: any
}

const Kpi: React.FC<KpiProps> = ({ kpi, values, trackingFilters }) => {
    const dispatch = useDispatch();

    const [val, setValue] = useState(values?.[kpi]?.value);
    const [trackingFilter, setTfValue] = useState(trackingFilters?.[kpi]?.id);

    const updateState = useMemo(
        () =>
          debounce((action, payload) => {
            dispatch(action(payload))
          }, 500),
        []
      );
    
      const handleKpiValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    
        updateState(setKpiValue, { kpi, value: e.target.value });
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
                    <input value={trackingFilter} onChange={handleTrackingFilterChange} />
                </>
                
            }
        </div>
    )
}

export default Kpi;
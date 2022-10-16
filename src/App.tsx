import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setKpiData, getKpiData } from "./reducer";
import { formatKpiData } from './helpers';
import Kpis from "./Kpis";
import KpisSelection from "./KpisSelection";

const App: React.FC = () => {
    const dispatch = useDispatch();

    const { kpis: { byAlphabeth } } = useSelector(getKpiData);

    useEffect(() => {
        // kpis be response / kpis submit callback result
        const kpis = {
            roas: {
                type: 'rate',
                value: 0.54,
                trackingFilter: '23456'
            },
            viewabilityRate: {
                type: 'rate',
                value: 0.23
            },
            videoCompletionRate: {
                type: 'rate',
                value: 0.12
            },
            ecpa: {
                type: 'effectiveCost',
                value: 23,
                trackingFilter: '12345'
            },
        }

        const { kpisState, valuesState, trackingFiltersState } = formatKpiData(kpis);

        dispatch(setKpiData({ kpis: kpisState, values: valuesState, trackingFilters: trackingFiltersState }));
    }, [dispatch])

    return (
        <>
            <Kpis />
            <KpisSelection selectedKpis={byAlphabeth} />
        </>
    )
};

export default App;

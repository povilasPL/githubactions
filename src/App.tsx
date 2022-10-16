import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import { setKpiData } from "./reducer";
import Kpis from "./Kpis";

const App: React.FC = () => {
    const dispatch = useDispatch();

    const brandingList = ['videoCompletionRate', 'viewabilityRate', 'ecpmReach', 'ecpmViewable'];
    const performanceLits = ['ctr', 'ecpc', 'ecpa', 'roas'];

    const KPI_TYPES = {
        rate: 'rate',
        effectiveCost: 'effectiveCost'
    }

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

        type acc = {
            branding: string[]
            performance: string[]
        }

        const kpisByType = reduce(kpis, (acc:acc, _, kpi) => {
            brandingList.includes(kpi) ? acc.branding.push(kpi) : acc.performance.push(kpi);

            return acc;
        }, {
            branding: [],
            performance:[]
        })

        const kpisByPriority = map(kpis, (_, kpi) => kpi);

        const kpisState = {
            byType: kpisByType,
            byPriority: kpisByPriority,
        }

        const valuesState = reduce(kpis, (acc, { value, type }, key) => {
            return {
                ...acc,
                [key]: {
                    type,
                    value: formatKpiValue(type, value)
                },
            }
        }, {});

        function formatKpiValue(type: string, value: number) {
            return type === KPI_TYPES.rate ? value *= 100 : value;
        }


        const trackingFiltersState = reduce(kpis, (acc, value: any, key) => {
            const trackingFilter = value?.trackingFilter
                ? { [key]: { id: value?.trackingFilter } }
                : null

            return {
                ...acc,
                ...trackingFilter,
            }
        }, {})


        dispatch(setKpiData({ kpis: kpisState, values: valuesState, trackingFilters: trackingFiltersState }));
    }, [dispatch, brandingList, performanceLits])

    return (
        <Kpis />
    )
};

export default App;

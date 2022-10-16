import map from 'lodash/map';
import reduce from 'lodash/reduce';

type acc = {
    branding: string[]
    performance: string[]
}

const brandingList = ['videoCompletionRate', 'viewabilityRate', 'ecpmReach', 'ecpmViewable'];

const KPI_TYPES = {
    rate: 'rate',
    effectiveCost: 'effectiveCost'
}

const KPI_TYPES_MAP: any = {
    videoCompletionRate: 'rate',
    viewabilityRate: 'rate',
    ecmpReact: 'effectiveCost',
    ecpmViewable: 'effectiveCost',
    ctr: 'rate',
    ecpc: 'effectiveCost',
    ecpa: 'effectiveCost',
    roas: 'rate',
}

export const formatKpiData = (kpis: any) => {
    const kpisByType = reduce(kpis, (acc: acc, _, kpi) => {
        brandingList.includes(kpi) ? acc.branding.push(kpi) : acc.performance.push(kpi);

        return acc;
    }, {
        branding: [],
        performance: []
    })

    const kpisByPriority = map(kpis, (_, kpi) => kpi);

    const kpisState = {
        byType: kpisByType,
        byPriority: kpisByPriority,
        byAlphabeth: kpisByPriority.sort(),
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

    return {
        kpisState,
        valuesState,
        trackingFiltersState
    }
}

export const mapKpiData = (kpis: any, values: any, trackingFilters: any) => {
    const newKpiData = reduce(kpis, (acc, kpi) => {
        const value = values?.[kpi]?.value ?? 0;
        const type = values?.[kpi]?.type ?? KPI_TYPES_MAP[kpi];
        const trackingFilter = trackingFilters[kpi]?.id ?? -3;

        const shouldIncludeTrackingFilter = kpi === 'roas' || kpi === 'ecpa'

        return {
            ...acc,
            [kpi]: {
                type,
                value: value && value > 0 ? value / 100 : 0, // still doesn't work correctly
                ...(shouldIncludeTrackingFilter && { trackingFilter })
            }
        }
    }, {})


    const { kpisState, valuesState, trackingFiltersState } = formatKpiData(newKpiData);

    return {
        kpisState,
        valuesState,
        trackingFiltersState
    }
}
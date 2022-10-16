import { createSlice, configureStore, createSelector } from '@reduxjs/toolkit';

const initialState = {
    kpiData: {
        kpis: {
            byType: {
                branding: [],
                performance: []
            },
            byPriority: [],
            byAlphabeth: [],
        },
        values: {},
        trackingFilters: {}
    }
}

const kpisSlice = createSlice({
    name: "kpiSlice",
    initialState,
    reducers: {
        setKpiData: (draftState, { payload: { kpis, values, trackingFilters } }) => {
            draftState.kpiData.kpis = kpis;
            draftState.kpiData.values = values;
            draftState.kpiData.trackingFilters = trackingFilters;
        },
        setKpiValue: (draftState, { payload: { kpi, value } }) => {
            draftState.kpiData.values[kpi].value = value;
        },
        setTrackingFilter: (draftState, { payload: { kpi, value } }) => {
            draftState.kpiData.trackingFilters[kpi].id = value;
        }
    }
})

export const { setKpiData, setKpiValue, setTrackingFilter } = kpisSlice.actions;

export const getKpiData = (state) => state.kpiData;

export const getKpisForBackEnd = createSelector(
    getKpiData,
    ({ kpis: { byPriority }, values, trackingFilters }) => {
        return byPriority.map((kpi) => {
            const value = values[kpi].value;
            const trackingFilter = trackingFilters?.[kpi]?.id;

            return ({
                [kpi]: {
                    value,
                    ...(trackingFilters[kpi] && { trackingFilter })
                }
            });
        })
    }
)

const store = configureStore({
    reducer: kpisSlice.reducer
})

export default store;

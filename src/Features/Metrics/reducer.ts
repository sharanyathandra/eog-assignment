import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Metric, MetricDataPayload, MetricsDataPayload, MetricSelectedPayload } from './types';

const initialState: {
  metrics: {
    [at: string]: Metric;
  };
  cardsValue: {
    [metric: string]: number;
  };
  selectedMetrics: string[];
} = {
  selectedMetrics: [],
  metrics: {},
  cardsValue: {},
};

const slice = createSlice({
  initialState,
  name: 'metricsReducer',
  reducers: {
    metricDataReceived: (state, action: PayloadAction<MetricDataPayload>) => ({
      ...state,
      metrics: action.payload.metrics,
      cardsValue: action.payload.cardsValue,
    }),
    metricsDataReceived: (state, action: PayloadAction<MetricsDataPayload>) => ({
      ...state,
      metrics: action.payload.metrics,
    }),
    metricsSelected: (state, action: PayloadAction<MetricSelectedPayload>) => ({
      ...state,
      selectedMetrics: action.payload.selectedMetrics,
    }),
    newMetricValueFetched: (state, action: PayloadAction<Metric>) => state,
  },
});

export const { reducer, actions } = slice;

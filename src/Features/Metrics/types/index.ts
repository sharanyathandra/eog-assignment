import { OptionTypeBase } from 'react-select';

export type Metric = {
  metric: string;
  at: string;
  value: number;
  unit: string;
};

export type MetricSelectedPayload = {
  selectedMetrics: string[];
  metricName: string;
};

export type MetricDataPayload = {
  metrics: {
    [at: string]: Metric;
  };
  cardsValue: {
    [metric: string]: number;
  };
};

export type MetricsDataPayload = {
  metrics: {
    [at: string]: Metric;
  };
};

export interface Option extends OptionTypeBase {
  label: string;
  value: string;
}

type Unit = {
  enabled: boolean;
  value: string;
  dx: number;
  dy: number;
  angle: number;
  yAxisId: number;
  fontSize?: number;
  tickFormatter?: (value: number) => string;
};

export type Units = {
  [key: string]: Unit;
};

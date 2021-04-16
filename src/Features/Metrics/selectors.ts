import { IState } from '../../store';

export const getSelectedMetrics = ({ metrics }: IState) => metrics.selectedMetrics;
export const getAllMetrics = ({ metrics }: IState) => metrics.metrics;
export const getLatestValues = ({ metrics }: IState) => metrics.cardsValue;

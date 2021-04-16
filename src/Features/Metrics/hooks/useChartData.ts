import { useSelector } from 'react-redux';
import { getAxisID, appendUnit } from '../../../utils';
import { getAllMetrics, getSelectedMetrics } from '../selectors';
import { Units } from '../types';

const useChartData = () => {
  const metrics = useSelector(getAllMetrics);
  const selectedMetrics = useSelector(getSelectedMetrics);
  const units: Units = {
    percentage: {
      enabled: selectedMetrics.some((metricName) => getAxisID(metricName) === 0),
      value: '%',
      dx: 10,
      dy: 10,
      angle: -90,
      yAxisId: 0,
    },
    pressure: {
      enabled: selectedMetrics.some((metricName) => getAxisID(metricName) === 1),
      value: 'PSI',
      dx: 10,
      dy: 10,
      angle: -90,
      fontSize: 12,
      yAxisId: 1,
      tickFormatter: appendUnit,
    },
    temperature: {
      enabled: selectedMetrics.some((metricName) => getAxisID(metricName) === 2),
      value: 'F',
      dx: 10,
      dy: 15,
      angle: -90,
      fontSize: 12,
      yAxisId: 2,
    },
  };
  const data = Object.keys(metrics).map(key => metrics[key]);
  return { selectedMetrics, units, data };
};

export default useChartData;

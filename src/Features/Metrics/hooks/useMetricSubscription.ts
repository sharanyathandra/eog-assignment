import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { actions } from '../reducer';
import { Metric } from '../types';
import { getSelectedMetrics, getLatestValues } from '../selectors';

interface SubscriptionData {
  newMeasurement: Metric;
}

const useMetricSubscription = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  const dispatch = useDispatch();
  const [result] = useSubscription<SubscriptionData>({
    query: `
        subscription {
            newMeasurement {
                at
                metric
                value
                unit
            }
        }`,
    pause: !selectedMetrics.length,
  });
  const { data } = result;

  useEffect(() => {
    if (data) {
      data && dispatch(actions.newMetricValueFetched(data.newMeasurement));
    }
  }, [data, dispatch]);

  const latestValues = useSelector(getLatestValues);
  return { selectedMetrics, latestValues };
};

export default useMetricSubscription;

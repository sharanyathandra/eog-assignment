import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OptionsType, ValueType, ActionMeta } from 'react-select';
import { Option } from '../types';
import { useQuery } from 'urql';
import { actions } from '../reducer';

const useMetricsDropdown = () => {
  const [options, setOptions] = useState<OptionsType<Option>>([]);

  const dispatch = useDispatch();
  const onSelect = (selectedMetrics: ValueType<Option>, action: ActionMeta<Option>) =>
    dispatch(
      actions.metricsSelected({
        selectedMetrics: selectedMetrics?.map((item: Option) => item.value) || [],
        metricName: action.option?.value || '',
      }),
    );

  const [result] = useQuery<{ getMetrics: Array<string> }>({
    query: `
    query {
        getMetrics
    }
    `,
  });
  const { data, error } = result;

  useEffect(() => {
    if (error || !data) return;
    const { getMetrics } = data;
    setOptions(getMetrics.map((option: string) => ({ label: option, value: option })));
  }, [data, error]);

  return { options, onSelect };
};

export default useMetricsDropdown;

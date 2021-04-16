import React from 'react';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import useMetricsDropdown from '../Features/Metrics/hooks/useMetricsDropdown';

const MetricDropdown = () => {
  const { options, onSelect } = useMetricsDropdown();
  return (
    <Grid item xs={12} md={6} lg={5}>
      <Select name="metricSelect" options={options} isMulti closeMenuOnSelect={false} onChange={onSelect} />
    </Grid>
  );
};

export default MetricDropdown;

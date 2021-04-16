import React from 'react';
import { Provider } from 'urql';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Charts from '../../components/Charts';
import client from './client';
import MetricDropdown from '../../components/MetricDropdown';
import useMetricSubscription from './hooks/useMetricSubscription';
import MetricCard from '../../components/MetricCard';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const MetricsSection = () => {
  const classes = useStyles();
  const { selectedMetrics, latestValues } = useMetricSubscription();
  return (
    <Grid container spacing={4} className={classes.container}>
      <Grid item xs={12}>
        <Grid container spacing={2} direction="row-reverse">
          <MetricDropdown />
        </Grid>
        <Grid item lg={7} md={6} xs={12} spacing={2} container>
          {selectedMetrics.map(metric => (
            <MetricCard key={metric} metricName={metric} currentValue={latestValues[metric]} />
          ))}
        </Grid>
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center">
        <Charts />
      </Grid>
    </Grid>
  );
};

const MetricsWithProvider = () => {
  return (
    <Provider value={client}>
      <MetricsSection />
    </Provider>
  );
};

export default MetricsWithProvider;

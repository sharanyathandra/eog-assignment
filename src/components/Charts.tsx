import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Grid, makeStyles } from '@material-ui/core';
import { COLORS, getAxisID } from '../utils';
import useChartData from '../Features/Metrics/hooks/useChartData';
import { Units } from '../Features/Metrics/types';

const useStyles = makeStyles({
  container: {
    width: '92vw',
    height: '92vh',
  },
});

const Charts = () => {
  const { selectedMetrics, units, data } = useChartData();
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <ResponsiveContainer>
        <LineChart width={600} height={600} data={data}>
          {renderLines(selectedMetrics)}
          {renderXAxis(selectedMetrics)}
          {renderYAxes(units)}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Grid>
  );
};

const renderLines = (selectedMetrics: string[]): React.ReactElement[] => {
  return selectedMetrics.map((metric, index) => {
    return <Line key={metric} yAxisId={getAxisID(metric)} dataKey={metric} stroke={COLORS[index]} dot activeDot />;
  });
};

const renderXAxis = (selectedMetrics: string[]) => {
  return selectedMetrics.length > 0 && <XAxis dataKey="at" interval={150} />;
};

const renderYAxes = (units: Units) => {
  return Object.keys(units).map(key => {
    const { enabled, yAxisId, tickFormatter, ...rest } = units[key];
    return (
      enabled && (
        <YAxis
          key={key}
          label={{ position: 'insideTopLeft', offset: 0, fill: '#908e8e', ...rest }}
          yAxisId={yAxisId}
          tickFormatter={tickFormatter}
        />
      )
    );
  });
};

export default Charts;

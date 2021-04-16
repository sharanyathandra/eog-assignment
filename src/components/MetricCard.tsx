import React from 'react';
import { Grid, CardContent, Typography, Card, CardHeader } from '@material-ui/core';
import useLastKnownMeasurement from '../Features/Metrics/hooks/useLastKnownMeasurement';

interface CardProps {
  metricName: string;
  currentValue: number;
}

const MetricCard: React.FC<CardProps> = ({ metricName, currentValue }) => {
  const value = useLastKnownMeasurement(metricName, currentValue);
  return (
    <Grid item md={5} xs={6}>
      <Card elevation={2}>
        <CardHeader title={metricName} />
        <CardContent>
          <Typography variant="h3">{currentValue ? currentValue : value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MetricCard;

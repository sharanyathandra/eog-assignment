import { takeEvery, put, fork, select } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { OperationResult } from 'urql';

import { actions } from './reducer';
import { MetricSelectedPayload, Metric } from './types';
import client from './client';
import { getAllMetrics, getLatestValues } from './selectors';

type QueryResult = {
  getMeasurements: Metric[];
};

type QueryArgs = {
  metricName: string;
  after: number;
};

type MetricsData = {
  [time: string]: Metric;
};

type PreviousValue = {
  [metric: string]: number;
};

const DURATION_IN_MINUTES = 30;

const getTimeBefore = (minutes: number) => new Date(new Date().getTime() - minutes * 60000).getTime();

const getTimeKey = (time: string) => {
  const hours = new Date(time).getHours() % 12 || 12;
  const minutes = new Date(time).getMinutes();
  const timeAt = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`;
  return timeAt;
};

function* reduceData({ payload: { metric, at, value } }: PayloadAction<Metric>) {
  const data: MetricsData = yield select(getAllMetrics);
  const timeAt = getTimeKey(at);
  const metrics = {
    ...data,
    [at]: {
      ...data[at],
      [metric]: value,
      at: timeAt,
    },
  };
  const previousCardValue: PreviousValue = yield select(getLatestValues);
  const cardsValue = {
    ...previousCardValue,
    [metric]: value,
  };
  yield put(actions.metricDataReceived({ metrics, cardsValue }));
}

function* combineMetrics(list?: Array<Metric>) {
  let metrics: { [at: string]: Metric } = yield select(getAllMetrics);
  list?.map(item => {
    const { metric, at, value } = item;
    const hrs = new Date(at).getHours() % 12 || 12;
    const mins = new Date(at).getMinutes();
    const timeAt = `${('0' + hrs).slice(-2)}:${('0' + mins).slice(-2)}`;
    metrics = {
      ...metrics,
      [at]: {
        ...metrics[at],
        [metric]: value,
        at: timeAt,
      },
    };
  });
  yield put(actions.metricsDataReceived({ metrics }));
}

function* fetchOldData({ payload }: PayloadAction<MetricSelectedPayload>) {
  const after = getTimeBefore(DURATION_IN_MINUTES);
  const { data }: OperationResult<QueryResult> = yield client
    .query<QueryResult, QueryArgs>(
      `
    query($metricName: String!, $after: Timestamp) {
        getMeasurements(input: { metricName: $metricName, after: $after }) {
            at
            metric
            value
            unit
        }
    }`,
      { metricName: payload.metricName, after },
    )
    .toPromise();
  yield fork(combineMetrics, data?.getMeasurements);
}

export default function* watcher() {
  yield takeEvery(actions.newMetricValueFetched.type, reduceData);
  yield takeEvery(actions.metricsSelected.type, fetchOldData);
}

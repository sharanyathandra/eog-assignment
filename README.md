## Create React App Visualization

Read more about this assessment [here](https://react.eogresources.com)

### Challenges

One of the challenges I have faced was to decide how to initiate the live data subscription. After some brainstorming and research, I arrived at the conclusion of using the custom made `useMetricSubscription` hook which will use a `useSubscription` hook which accepts an additional option `pause` which will help to pause the live subscription when not required. I have passed the length of selected metrics array state to it, so that the live subscription will be paused when there no metrics selected.

### Hooks

I have made use of 4 custom hooks which I have created (`useLastKnownMeasurement`, `useMetricsDropdown`, `useMetricSubscription`, `useChartData`).

- **useLastKnownMeasurement**: Uses the getLastKnownMeasurement api for a metric to get the last known value of a particular metric.
- **useMetricsDropdown**: Handles the state for the dropdown component for metrics. It also handles the dispatching actions required whenever a user selects a metric from the dropdown and updates the redux state accordingly.
- **useMetricSubscription**: Handles the realtime subscription with the graphql API for fetching live values as it arrives from the api. This will only fetch the values for the selected metrics.
- **useChartData**: Provides the data required for the Chart component. This select the state required for the Chart component using a few selector hooks and combines and provides it to the calling component.

### Libraries Used

[recharts](https://github.com/recharts/recharts) - for Charts
[react-select](https://github.com/JedWatson/react-select) - for the Select component.

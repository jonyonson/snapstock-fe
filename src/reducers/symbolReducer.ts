export const initialState = {
  quote: null,
  stats: null,
  chartLoading: true,
  profile: null,
  error: null,
  chart: { '1d': [], data: [] },
};

export default function symbolReducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        chartLoading: false,
        error: null,
        quote: action.payload.quote,
        stats: action.payload.stats,
        profile: action.payload.company,
        chart: {
          ...state.chart,
          '1d': action.payload['intraday-prices'],
          data: action.payload['intraday-prices'],
          type: '1d',
        },
      };

    case 'FETCH_FAIL':
      return {
        ...state,
        chartLoading: false,
        error: action.payload,
        profile: null,
        quote: null,
        chart: { '1d': [], data: [] },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

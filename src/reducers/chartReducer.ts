type FixMeLater = any;

export default function chartReducer(state: FixMeLater, action: FixMeLater) {
  if (action.type === 'CHANGE_CHART_RANGE') {
    return {
      ...state,
      type: action.payload.type,
      [action.payload.type]: action.payload.data,
      data: action.payload.data,
    };
  }

  return state;
}

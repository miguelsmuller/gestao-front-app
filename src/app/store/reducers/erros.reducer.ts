import { ErrorActions, ErrorActionTypes } from '@app/store/actions/errors.action';

export interface ErrorState {
  error: any;
}

const initialState: ErrorState = {
  error: null
};

export function errorReducer(state = initialState, action: ErrorActions) {
  switch (action.type) {
    case ErrorActionTypes.ADD_ERROR:
      return state;

    case ErrorActionTypes.REMOVE_ERROR:
      return state;

    default:
      return state;
  }
}
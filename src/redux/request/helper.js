import { getAccessToken } from '../../helpers/auth';

export const requestConstantsMaker = str => ({
  REQUEST: `${str}_REQUEST`,
  SUCCESS: `${str}_SUCCESS`,
  FAILURE: `${str}_FAILURE`,
});

export const requestActionMaker = action => ({
  ...action,
  type: action.cons.REQUEST,
});

export const uiConstantsMaker = str => ({
  REQUEST_UPDATE: `${str}_REQUEST_UPDATE`,
  SUCCESS: `${str}_SUCCESS`,
  FAILURE: `${str}_FAILURE`,
});

export const uiActionMaker = action => ({
  ...action,
  type: action.cons.REQUEST_UPDATE,
});

export const fetchingState = (state, action) => {
  let needIsFetchingState = true;
  if (action.reset) state.data = [];
  if (action.isFetchBkg) needIsFetchingState = false;

  return {
      ...state,
      success: false,
      dataFetched: false,
      isFetching: needIsFetchingState,
      error: false,
      ack: action.ack,
      type: action.type,
  };
};

export const successState = (state, action) => {
  const { ignoreAck } = action;

  if (state.ack !== action.ack && !ignoreAck) {
      return {
          ...state,
          reject_ack: true,
      };
  }

  console.log(action);
  return {
      ...state,
      success: true,
      dataFetched: true,
      isFetching: false,
      reject_ack: false,
      ...action,
  };
};

function checkAPIErrorCode(err) {
  try {
      if(err.response && err.response.data){
          return err.response.data.code || 'Unknown API Error';
      }else if(err.message){
          if(err.message === "Network Error"){
              return err.message;                
          }else{
              return 'Unknown Error';
          }
      }
  } catch (e) {
  }
  return 'Unknown API Error';
}

function checkAPIErrorMessage(err) {
  try {
      if(err.response && err.response.data){
          return err.response.data.message || 'Unknown API Error';
      }else if(err.message){
          if(err.message === "Network Error"){
              return err.message;                
          }else{
              return 'Unknown Error';
          }
      }
  } catch (e) {
  }
  return 'Unknown Error';
}

export const failureState = (state, action) => ({
  ...state,
  success: false,
  isFetching: false,
  error: true,
  errorMessage: checkAPIErrorMessage(action.error),
  errorCode: checkAPIErrorCode(action.error),
  api: action.cons,
  timestamp: Date.now(),
  type: action.type,
});

export const requestReducerMaker = (cons, state, action) => {
  switch (action.type) {
      case cons.REQUEST:
          return fetchingState(state, action);
      case cons.SUCCESS:
          return successState(state, action);
      case cons.FAILURE:
          return failureState(state, action);
      default:
          return state;
  }
};

export const uiReducerMaker = (cons, state, action) => {
  if (action.type === cons.SUCCESS) {
      return {
          ...state,
          ...action,
      };
  }
  return state;
};

export const initialState = {
  data: undefined,
  dataFetched: false,
  isFetching: false,
  error: false,
};

export function authHeader() {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
  };
}
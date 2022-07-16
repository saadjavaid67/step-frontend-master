import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from './actions';

function* fetchData(action) {
  try {
    const data = yield call(action.api, action);
    yield put({ type: action.cons.SUCCESS, ack: action.ack, data });
  } catch (e) {
    yield put({
      type: action.cons.FAILURE,
      error: e,
      api: action.cons,
      timestamp: Date.now(),
    });
  }
}

const all_actions = [];
for (const act in actions) {
  all_actions.push(takeEvery(actions[act]().cons.REQUEST, fetchData));
}
export default all_actions;
import { takeEvery, put } from 'redux-saga/effects';
import * as actions from './actions'

function* updateLayout (action) {   
    try {    
      yield put({  ...action, type: action.cons.SUCCESS })
    } catch (e) {
      console.log(e);
      yield put({ 
        type: action.cons.FAILURE,
        error: e,
        api: action.cons,
        timestamp: Date.now()
      })
    }
  }

let all_actions = [];  
for (var act in actions) {
  all_actions.push(takeEvery(actions[act]().cons.REQUEST_UPDATE, updateLayout));
}
export default all_actions;
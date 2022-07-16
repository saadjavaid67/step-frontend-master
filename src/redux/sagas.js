import { all } from 'redux-saga/effects';
import requestSagas from './request/sagas';
import uiSagas from './ui/sagas';

function* rootSagas () {
  let allSagas = []; 
  requestSagas.forEach(sage => {
    allSagas.push(sage);
  });
  uiSagas.forEach(sage => {
    allSagas.push(sage);
  });
  yield all(allSagas);
}

export default rootSagas

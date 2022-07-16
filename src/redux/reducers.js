import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import App from './app/reducer';
import RequestReducers from './request/reducers';
import UiReducers from './ui/reducers';

export default history =>
  combineReducers({
    router: connectRouter(history),
    App,
    ...RequestReducers,
    ...UiReducers,
  });
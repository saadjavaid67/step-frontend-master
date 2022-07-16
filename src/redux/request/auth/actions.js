import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

export const login = para => requestActionMaker({ cons: cons.LOGIN, api: apis.login, ...para });
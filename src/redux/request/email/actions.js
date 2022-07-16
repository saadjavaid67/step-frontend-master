import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

export const getAllEmailRecordBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_EMAIL_RECORD_BY_SPECIFICATION, api: apis.getAllEmailRecordBySpecification, ...para });
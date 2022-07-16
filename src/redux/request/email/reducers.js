import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

export const getAllEmailRecordBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_EMAIL_RECORD_BY_SPECIFICATION, state, action);
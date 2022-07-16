import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

export const login = (state = initialState, action) => requestReducerMaker(cons.LOGIN, state, action);

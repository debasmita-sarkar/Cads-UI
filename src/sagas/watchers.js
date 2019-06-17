import { takeLatest } from 'redux-saga/effects';
import { registerSaga, loginSaga } from './AuthenticationSaga';

import * as types from '../store/index.js';


export default function* watchUserAuthentication() {
  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(types.LOGIN_USER, loginSaga);
}
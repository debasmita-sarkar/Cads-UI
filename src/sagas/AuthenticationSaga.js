import { put, call } from 'redux-saga/effects';
import * as types from '../store/index.js';
import axios from 'axios';

export function* registerSaga(payload) {
  try {
    const response = yield call(registerApi, payload);
    yield [
      put({ type: types.REGISTER_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

export function* loginSaga(payload) {
  try {
	  console.log("in login saga: " );
    const response = yield call(loginApi, payload);
    console.log("login response: " + response);
    yield [
      put({ type: types.LOGIN_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

/** function that returns an axios call */
function loginApi(authParams) {
  return   axios.get('http://localhost:8080/auth', {headers: { 
      'content-type' : 'application/json',
  },params: {
	  authParams
}})
}

function registerApi(authParams) {
	  return   axios.get('http://localhost:8080/auth', {headers: { 
	      'content-type' : 'application/json',
	  },params: {
	   userName: this.state.email,
	   password:this.state.password
	}})
	}

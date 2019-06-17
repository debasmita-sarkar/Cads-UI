import * as types from './index';

export const registerUserAction = (user) => {
  return {
    type: types.REGISTER_USER,
    user
  }
};

export const loginUserAction = (email,password) => {
  return {
    type: types.LOGIN_USER,
    email,
    password
  }
};

export const getLoginVal = () => {
	  return {
	    type: types.LOGIN_VAL
	  }
	};


export const getInitialNotes = () => {
  return {
    type: 'GET_NOTES',
  }
}

export const addNewNote = (note) => {
  return {
    type: 'ADD_NOTE',
    note
  }
}

export const removeNote = (note) => {
  return {
    type: 'REMOVE_NOTE',
    note
  }
}
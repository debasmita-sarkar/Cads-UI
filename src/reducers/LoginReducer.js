import * as types from '../store/index.js';
import axios from 'axios';

const initialState = {		 
		  isSignedIn: false,
		  user:null
		}

export default function(state = initialState, action) {
  const response = action.response;
  console.log("hi in login reducer "+ initialState.isSignedIn+ "::"+action.email);
  switch(action.type) {  
  case types.LOGIN_USER:
	  axios.get('http://localhost:8080/auth', {headers: 
	  { 
	      'content-type' : 'application/json'
      },
      params: {
    	  userName: action.email,
		   password:action.password
      }
      }).then(response => {
    	  console.log(response.data);
	   return { ...state, isSignedIn:response.data , user: action.email };
                              
        })
     .catch(function(error){
       console.log(error);			       
       return { ...state, isSignedIn:false };
     }); 
  case types.LOGIN_VAL:
	  return {...state, ...state.isSignedIn};
	  
    case types.LOGIN_USER_SUCCESS:
      return { ...state, response };
    case types.LOGIN_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
};
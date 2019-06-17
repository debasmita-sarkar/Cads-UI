import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
	
	const sagaMiddleware = createSagaMiddleware();
  //return createStore(
   // rootReducer,
   // initialState,
    //compose(
    //  applyMiddleware(thunk, reduxImmutableStateInvariant()),
    //  window.devToolsExtension ? window.devToolsExtension() : f => f
  //  ));    
    return createStore(rootReducer,initialState,applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga); /* inject our sagas into the middleware*/
    
}
import React from 'react';
import { Route} from 'react-router-dom';
import BaseContainer from '../components/Container/BaseContainer.js';
import RegisterPage from '../components/Register/RegisterPage';

export default (
  <Route path='/' component={BaseContainer}>
    
    <Route path='register' component={RegisterPage} />
  </Route>
);
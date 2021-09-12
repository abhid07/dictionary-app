import { combineReducers } from 'redux';
import {navBar} from './navBarReducer/navBar'

export default () =>
  combineReducers({ 
      navBar
   });
   
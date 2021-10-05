import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    assetReducer,
    assetReducer1,
} from '../reducers/assetReducer';
import { userReducer } from '../reducers/userReducer';
import { settingReducer } from '../reducers/settingReducer';

const reducer = combineReducers({
    userState:userReducer,
    assetState: assetReducer,
    assetState1: assetReducer1,
    settingState: settingReducer
})

const allOptions = localStorage.getItem('allopt')
  ? JSON.parse(localStorage.getItem('allopt'))
  : {}

const initialState = {
    assetState: {    //key should be from above any one of the reducer
        alloptions: allOptions
    }
}
  
  const middleware = [thunk]
  
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store;
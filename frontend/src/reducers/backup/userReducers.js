import { INCREMENT, LOGIN } from '../constants/constants';

const initialState = {

};

function userReducers (state = initialState, action) {
	switch (action.type) {
		case LOGIN: {
			return { ...state, [action.type]: action.payload }
		}
		case INCREMENT: {
			return { ...state, value: state.value + 1 }
		}        
		case 'counter/decrementeds':
			return { ...state, value: state.value - 1 }
		case 'counter/both': {
			return { ...state, value: state.value - 1, more: 'Test', pay: action.payload }
		}
		case 'counter/one': {
			return { ...state, obj: state.pay.map(val =>{console.log(val);return{...val, val: val}}) }
		}
		case 'loader': {
			return { ...state, loader:action.payload }
		}
		default:
			return state
			
	}
};

export default userReducers;

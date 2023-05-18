// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const userWalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return { ...state };
  }
};

export default userWalletReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_REQUEST, SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case API_REQUEST:
    return ({
      ...state,
      currencies: payload,
    });
  case SET_EXPENSES:
    return ({
      ...state,
      expenses: payload,
    });
  default: { return state; }
  }
};

export default wallet;

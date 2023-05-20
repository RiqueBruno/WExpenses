// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_REQUEST, SET_EXPENSES, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (API_REQUEST): {
    return ({
      ...state,
      currencies: action.payload,
    });
  }
  case (SET_EXPENSES): {
    return ({
      ...state,
      expenses: action.payload,
    });
  }
  case (DEL_EXPENSE): {
    return ({
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== Number(action.payload)),
    });
  }
  default: { return state; }
  }
};

export default wallet;

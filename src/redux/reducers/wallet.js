import { API_REQUEST, SET_EXPENSES,
  DEL_EXPENSE, ID_EXPENSE_EDITING, SAVE_EXPENSE_EDITED } from '../actions/actionType';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idTargetEditing: 0,
  isEditingTrue: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case API_REQUEST: {
    return { ...state, currencies: payload };
  }
  case SET_EXPENSES: {
    return {
      ...state,
      expenses: payload,
    };
  }
  case DEL_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== Number(payload)),
    };
  }
  case ID_EXPENSE_EDITING: {
    return {
      ...state,
      isEditingTrue: true,
      idTargetEditing: payload,
    };
  }
  case SAVE_EXPENSE_EDITED: {
    return { ...state,
      isEditingTrue: false,
      expenses: state.expenses
        .map((expense) => (expense.id === payload.id ? payload : expense)),
    };
  }
  default: { return state; }
  }
};

export default wallet;

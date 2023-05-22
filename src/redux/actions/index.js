import { USER_EMAIL, API_REQUEST, SET_EXPENSES,
  DEL_EXPENSE, ID_EXPENSE_EDITING, SAVE_EXPENSE_EDITED } from './actionType';

// USER INFOS
export const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

// FORM INFOS
export const apiRequest = (payload) => ({
  type: API_REQUEST,
  payload,
});

export function currenciesApi() {
  return async (currencies) => {
    const API = await fetch('https://economia.awesomeapi.com.br/json/all');
    const acronyms = await API.json();
    const acronymsList = Object.keys(acronyms).filter((acronym) => acronym !== 'USDT');
    currencies(apiRequest(acronymsList));
  };
}

// ACTIONS USER
export const setExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const putExpenses = (payload) => async (currencies, getState) => {
  const { expenses } = getState().wallet;
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await API.json();
  const id = expenses.length > 0 ? expenses
    .reduce((acc, expense) => (expense.id > acc ? expense.id : acc), 0) + 1 : 0;
  const expense = { id, ...payload, exchangeRates };
  currencies(setExpenses([...expenses, expense]));
};

export const delExpense = (id) => ({
  type: DEL_EXPENSE,
  payload: id,
});

export const idExpenseEditing = (payload) => ({
  type: ID_EXPENSE_EDITING,
  payload,
});

export const saveExpenseEdited = (payload) => ({
  type: SAVE_EXPENSE_EDITED,
  payload,
});

export const hrCkToSaveExpenseEdited = (payload) => async (currencies, getState) => {
  const { expenses, idTargetEditing } = getState().wallet;
  const { exchangeRates } = expenses
    .find((expense) => Number(expense.id) === Number(idTargetEditing));
  currencies(saveExpenseEdited({ id: idTargetEditing, ...payload, exchangeRates }));
};

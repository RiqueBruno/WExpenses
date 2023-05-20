// Coloque aqui suas actions
// export const USER_WALLET = 'USER_WALLET';

export const USER_EMAIL = 'USER_EMAIL';
export const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

export const API_REQUEST = 'API_REQUEST';
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
export const SET_EXPENSES = 'SET_EXPENSES';
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

export const DEL_EXPENSE = 'DEL_EXPENSE';
export const delExpense = (id) => ({
  type: DEL_EXPENSE,
  payload: id,
});

// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
// export const USER_WALLET = 'USER_WALLET';
export const API_REQUEST = 'API_REQUEST';

export const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

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

import api from '../api';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

const getAuthHeaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getCurrencyList = () => {
  return api.get('/currency/list');
};

const updateUserCurrency = (currency) => {
  return api.put('/currency/user', { currency }, getAuthHeaders());
};

const currencyService = {
  getCurrencyList,
  updateUserCurrency,
};

export default currencyService;
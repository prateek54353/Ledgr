import api from '../api';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

const getAuthHeaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getTransactions = () => {
  return api.get('/transactions', getAuthHeaders());
};

const createTransaction = (transactionData) => {
  return api.post('/transactions', transactionData, getAuthHeaders());
};

const deleteTransaction = (id) => {
  return api.delete(`/transactions/${id}`, getAuthHeaders());
};

const transactionService = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};

export default transactionService;
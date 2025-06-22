import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import currencyService from '../services/currencyService.js';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CurrencySelector = () => {
  const { user, updateUserCurrency } = useContext(AuthContext);
  const [currencies, setCurrencies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await currencyService.getCurrencyList();
        setCurrencies(response.data);
      } catch (error) {
        console.error("Failed to fetch currencies", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  const handleCurrencyChange = async (e) => {
    const newCurrency = e.target.value;
    try {
      await currencyService.updateUserCurrency(newCurrency);
      updateUserCurrency(newCurrency);
    } catch (error) {
      console.error("Failed to update currency", error);
      alert("Error updating currency.");
    }
  };

  if (!user) return null;

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="currency-select-label" sx={{color: '#ccc', '&.Mui-focused': {color: 'white'} }}>Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        id="currency"
        value={user.currency || 'USD'}
        onChange={handleCurrencyChange}
        disabled={isLoading}
        label="Currency"
        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: '#5f7e9d' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '.MuiSvgIcon-root': { color: 'white' } }}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <MenuItem key={code} value={code}>{code}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
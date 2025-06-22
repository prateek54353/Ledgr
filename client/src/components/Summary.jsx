import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Paper, Typography, Grid, Box } from '@mui/material';

const Summary = ({ transactions }) => {
  const { user } = useContext(AuthContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: user?.currency || 'USD',
    }).format(amount);
  };

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = income - expense;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Income</Typography>
          <Typography variant="h5" sx={{ color: 'success.main', fontWeight: 'bold' }}>
            {formatCurrency(income)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Expense</Typography>
          <Typography variant="h5" sx={{ color: 'error.main', fontWeight: 'bold' }}>
            {formatCurrency(expense)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Balance</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: balance < 0 ? 'error.main' : 'inherit' }}>
            {formatCurrency(balance)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Summary;
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const { type, category, amount, date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert('Please fill in category and amount');
      return;
    }
    onAddTransaction({ ...formData, amount: +amount });
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Add New Transaction</Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name="type" label="Type" value={type} onChange={onChange}>
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="category" label="Category (e.g., Food, Salary)" value={category} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="number" name="amount" label="Amount" value={amount} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="date" name="date" value={date} onChange={onChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>Add Transaction</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TransactionForm;
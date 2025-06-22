import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Paper, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  // Process data for the chart
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

  const data = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseData),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>Expense Breakdown</Typography>
      {Object.keys(expenseData).length > 0 ? (
        <Doughnut data={data} />
      ) : (
        <Typography sx={{ mt: 4, textAlign: 'center' }}>
          No expense data available.
        </Typography>
      )}
    </Paper>
  );
};

export default ExpenseChart;
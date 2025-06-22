import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import transactionService from '../services/transactionService.js';

// Material-UI Imports
import { Box, Typography, Button, CircularProgress, Alert, Grid, Skeleton } from '@mui/material';

// Component Imports
import Summary from '../components/Summary.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import CurrencySelector from '../components/CurrencySelector.jsx';
import ExpenseChart from '../components/ExpenseChart.jsx';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handler for logging out
  const onLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await transactionService.getTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []); // Empty dependency array ensures this runs only once

  // Handler to add a new transaction to the state
  const handleAddTransaction = async (transactionData) => {
    try {
      const response = await transactionService.createTransaction(transactionData);
      setTransactions([response.data, ...transactions]);
    } catch (err) {
      setError('Failed to add transaction.');
      console.error(err);
    }
  };

  // Handler to delete a transaction from the state
  const handleDeleteTransaction = async (id) => {
    try {
      await transactionService.deleteTransaction(id);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) { // <<< THE FIX IS HERE (added the missing '{')
      setError('Failed to delete transaction.');
      console.error(err);
    }
  };

  // --- RENDER LOGIC ---
  const renderDashboardContent = () => {
    if (isLoading) {
      // Professional Skeleton Loading State
      return (
        <Box>
          <Skeleton variant="rectangular" height={95} sx={{ mb: 4, borderRadius: 3 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Skeleton variant="rectangular" height={430} sx={{ borderRadius: 3 }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Skeleton variant="rectangular" height={430} sx={{ borderRadius: 3 }} />
            </Grid>
          </Grid>
        </Box>
      );
    }

    return (
      <>
        <Summary transactions={transactions} />
        
        <Grid container spacing={4} sx={{ mt: 0.5 }}>
          {/* Left Column: Form & Chart */}
          <Grid item xs={12} lg={5}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TransactionForm onAddTransaction={handleAddTransaction} />
              </Grid>
              <Grid item xs={12}>
                <ExpenseChart transactions={transactions} />
              </Grid>
            </Grid>
          </Grid>
          
          {/* Right Column: Transaction History */}
          <Grid item xs={12} lg={7}>
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction} 
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box>
      {/* Dashboard Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CurrencySelector />
          <Button variant="contained" color="error" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {renderDashboardContent()}
    </Box>
  );
};

export default Dashboard;
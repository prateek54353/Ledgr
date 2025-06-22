import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const { user } = useContext(AuthContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: user?.currency || 'USD',
    }).format(amount);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>History</Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem 
            key={transaction._id} 
            sx={{ 
              borderRight: 5, 
              borderColor: transaction.type === 'income' ? 'success.main' : 'error.main',
              mb: 1,
              bgcolor: 'background.paper'
            }}
          >
            <ListItemText
              primary={transaction.category}
              secondary={new Date(transaction.date).toLocaleDateString()}
            />
            <ListItemText 
              primary={formatCurrency(transaction.amount)} 
              primaryTypographyProps={{ 
                style: { 
                  fontWeight: 'bold',
                  color: transaction.type === 'income' ? 'green' : 'red',
                  textAlign: 'right'
                }
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTransaction(transaction._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionList;
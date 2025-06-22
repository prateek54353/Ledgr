import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', boxShadow: 'none', borderBottom: '1px solid #34495e' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
          }}
          as={Link}
          to="/"
        >
          Ledgr
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
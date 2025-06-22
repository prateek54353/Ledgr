import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

// MUI Imports
import { Button, TextField, Typography, Container, Box, Card, CardContent, CircularProgress, Alert, Link, Divider } from '@mui/material';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { username, email, password } = formData;
  const navigate = useNavigate();
  const { user, login, googleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/');
    } catch (error) {
      setError('Google Sign-Up failed. The email might already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(username, email, password);
      // After successful registration, automatically log the user in
      await login(email, password);
      navigate('/');
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ minWidth: 400, boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Create an Account for Ledgr
            </Typography>

            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Sign-Up failed. Please try again.')}
                useOneTap
              />
            </Box>

            <Divider>OR</Divider>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
              <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={username} onChange={onChange} />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={onChange} />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" helperText="Password must be at least 6 characters long." value={password} onChange={onChange} />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
              <Box textAlign="center">
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;
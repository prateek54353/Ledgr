import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { GoogleLogin } from '@react-oauth/google';

// MUI Imports
import { Button, TextField, Typography, Container, Box, Card, CardContent, CircularProgress, Alert, Link, Divider } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    identifier: '', // This field will hold either email or username
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { identifier, password } = formData;
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
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier, password);
      navigate('/');
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        'Invalid credentials or server error';
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
              Sign in to Ledgr
            </Typography>

            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Sign-In failed.')}
              />
            </Box>

            <Divider>OR</Divider>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
              <TextField margin="normal" required fullWidth id="identifier" label="Email or Username" name="identifier" autoComplete="email" autoFocus value={identifier} onChange={onChange} />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={onChange} />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              <Box textAlign="center">
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
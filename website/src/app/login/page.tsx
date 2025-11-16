'use client';
import { Container, Box, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            href={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL}
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

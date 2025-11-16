'use client';
import { Container, Typography, Paper } from '@mui/material';
import { withAuth } from '@/hoc/withAuth';

function AdminDashboardPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4 }}>
        Admin Dashboard
      </Typography>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography>
          Welcome to the admin dashboard. Use the sidebar to navigate to the different admin sections.
        </Typography>
      </Paper>
    </Container>
  );
}

export default withAuth(AdminDashboardPage, ['admin']);

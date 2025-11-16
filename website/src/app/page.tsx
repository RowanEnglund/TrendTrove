'use client';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/auth.context';

export default function Home() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4 }}>
        Welcome to TrendTrove
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Products
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Discover the latest trends
              </Typography>
              <Typography variant="body2">
                Browse our curated collection of trending products.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} href="/products" size="small">Browse Products</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Your Profile
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Manage your account
              </Typography>
              <Typography variant="body2">
                Update your profile, view your wishlist, and manage your preferences.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} href="/profile" size="small">Go to Profile</Button>
            </CardActions>
          </Card>
        </Grid>
        {user?.role === 'admin' && (
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Admin Dashboard
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  For administrators
                </Typography>
                <Typography variant="body2">
                  Manage products, orders, and users.
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} href="/admin/dashboard" size="small">Admin Login</Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  specs: Record<string, string>;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('An error occurred while fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4 }}>
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.images[0] || 'https://via.placeholder.com/150'}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

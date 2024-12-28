"use client";

import { Card, CardContent, CardMedia, Typography, Rating, Button, Chip } from "@mui/material";
import { ShoppingCart, Eye } from "lucide-react";

interface Seller {
  id: string;
  name: string;
  rating: number;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
  seller: Seller;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, description, price, image, rating, sales, seller, category } = product;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardMedia
        component="img"
        height="200"
        image={image || '/placeholder-template.jpg'}
        alt={title}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow flex flex-col">
        <div className="mb-2">
          <Chip 
            label={category} 
            size="small" 
            className="mb-2"
            color="primary"
            variant="outlined"
          />
        </div>
        <Typography variant="h6" component="h3" className="mb-1 line-clamp-2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2 line-clamp-2">
          {description}
        </Typography>
        <div className="flex items-center gap-2 mb-2">
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({sales} ventas)
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          Por {seller.name}
        </Typography>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <Typography variant="h6" color="primary">
            ${price.toFixed(2)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="small"
              startIcon={<Eye className="w-4 h-4" />}
            >
              Vista previa
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCart className="w-4 h-4" />}
            >
              Comprar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

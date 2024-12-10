import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, Badge, Chip } from '@mui/material';
import { Star, Heart, ShoppingCart, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  sales: number;
  seller: {
    name: string;
    verified?: boolean;
  };
  previewImage: string;
  isFeatured?: boolean;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  price,
  rating,
  sales,
  seller,
  previewImage,
  isFeatured,
  onFavorite,
  isFavorite
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden",
          "hover:shadow-lg transition-shadow duration-200",
          "bg-white dark:bg-gray-800"
        )}
      >
        {/* Badge de Featured */}
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium"
              sx={{ '& .MuiBadge-badge': { position: 'static' } }}
              badgeContent={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Award size={12} />
                  Featured
                </Box>
              }
            />
          </div>
        )}

        {/* Botón de Favorito */}
        <button
          onClick={onFavorite}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors duration-200",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </button>

        {/* Imagen con overlay gradiente */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={previewImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Contenido */}
        <Box sx={{ p: 2 }}>
          {/* Título y Precio */}
          <div className="flex justify-between items-start mb-2">
            <Typography
              variant="h6"
              className="font-semibold text-gray-900 dark:text-white line-clamp-1"
              sx={{ fontSize: '1.1rem' }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              className="text-blue-600 font-bold"
              sx={{ fontSize: '1.1rem' }}
            >
              ${price}
            </Typography>
          </div>

          {/* Descripción */}
          <Typography
            variant="body2"
            color="text.secondary"
            className="mb-3 line-clamp-2 h-10"
          >
            {description}
          </Typography>

          {/* Rating y Ventas */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <Typography variant="body2" className="font-medium">
                {rating.toFixed(1)}
              </Typography>
            </div>
            <Typography variant="body2" color="text.secondary">
              {sales} ventas
            </Typography>
          </div>

          {/* Vendedor */}
          <div className="flex items-center gap-2 mb-3">
            <Typography variant="body2" color="text.secondary">
              por
            </Typography>
            <Chip
              size="small"
              label={seller.name}
              variant="outlined"
              color={seller.verified ? "primary" : "default"}
              icon={seller.verified ? <Award size={14} /> : undefined}
            />
          </div>

          {/* Botón de Compra */}
          <Link
            to={`/dashboard/marketplace/template/${id}`}
            className="block w-full"
          >
            <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md">
              <ShoppingCart size={18} />
              Ver Detalles
            </button>
          </Link>
        </Box>
      </Card>
    </motion.div>
  );
};

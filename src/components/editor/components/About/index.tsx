import React from 'react';
import { Section } from '../base/Section';
import { Grid } from '../base/Grid';
import { Card } from '../base/Card';
import { Box, Typography } from '@mui/material';

interface AboutProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  styles?: any;
  isEditing?: boolean;
  onEdit?: (content: any) => void;
}

export const About: React.FC<AboutProps> = ({
  content,
  styles,
  isEditing,
  onEdit
}) => {
  const {
    title = 'Sobre Nosotros',
    subtitle = 'Conoce más sobre nuestra empresa',
    description = 'Descripción detallada sobre la empresa y su misión',
    items = []
  } = content;

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background="paper"
      spacing="large"
    >
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}
          contentEditable={isEditing}
          onBlur={(e) => onEdit?.({ ...content, description: e.currentTarget.textContent })}
        >
          {description}
        </Typography>
      </Box>

      {items.length > 0 && (
        <Grid
          items={items}
          onItemEdit={(index, item) => {
            const newItems = [...items];
            newItems[index] = item;
            onEdit?.({ ...content, items: newItems });
          }}
          isEditing={isEditing}
          columns={3}
          renderItem={(item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isEditing={isEditing}
              onEdit={(editedItem) => {
                const newItems = [...items];
                newItems[index] = editedItem;
                onEdit?.({ ...content, items: newItems });
              }}
            />
          )}
        />
      )}
    </Section>
  );
};

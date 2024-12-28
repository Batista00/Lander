import React from 'react';
import { Section } from '../base/Section';
import { Grid } from '../base/Grid';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ClientsProps {
  content: {
    title?: string;
    subtitle?: string;
    clients?: Array<{
      name: string;
      logo: string;
      url?: string;
    }>;
  };
  styles?: any;
  isEditing?: boolean;
  onEdit?: (content: any) => void;
}

const ClientLogo = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  filter: 'grayscale(100%)',
  opacity: 0.7,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    filter: 'grayscale(0%)',
    opacity: 1,
  },
});

export const Clients: React.FC<ClientsProps> = ({
  content,
  styles,
  isEditing,
  onEdit
}) => {
  const {
    title = 'Nuestros Clientes',
    subtitle = 'Empresas que confían en nosotros',
    clients = []
  } = content;

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background="paper"
      spacing="medium"
    >
      <Grid
        items={clients}
        onItemEdit={(index, item) => {
          const newClients = [...clients];
          newClients[index] = item;
          onEdit?.({ ...content, clients: newClients });
        }}
        isEditing={isEditing}
        columns={4}
        renderItem={(client, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 2,
            }}
          >
            <ClientLogo
              src={client.logo}
              alt={client.name}
              style={{ maxHeight: '80px', objectFit: 'contain' }}
            />
            {isEditing && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
                contentEditable
                onBlur={(e) => {
                  const newClients = [...clients];
                  newClients[index] = {
                    ...client,
                    name: e.currentTarget.textContent || ''
                  };
                  onEdit?.({ ...content, clients: newClients });
                }}
              >
                {client.name}
              </Typography>
            )}
          </Box>
        )}
      />
    </Section>
  );
};

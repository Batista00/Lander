import React from 'react';
import TemplateCard from './TemplateCard';
import { Template } from '@/types';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LandingTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  user?: any;
}

export const LandingTemplates: React.FC<LandingTemplatesProps> = ({
  templates,
  onSelectTemplate,
  user
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Plantillas Disponibles
      </Typography>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            {template.premium && !user?.premium ? (
              navigate('/pricing')
            ) : (
              <TemplateCard
                template={template}
                onSelect={onSelectTemplate}
                user={user}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

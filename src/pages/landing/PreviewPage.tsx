import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { landingPageService } from '../../services/landingPageService';
import { toast } from 'sonner';
import { PreviewLayout } from '@/components/PreviewLayout';

interface ComponentProps {
  content?: any;
}

const HeroComponent: React.FC<ComponentProps> = ({ content = {} }) => (
  <Box sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h2" sx={{ mb: 2 }}>{content.title || 'Título'}</Typography>
    <Typography variant="h5" sx={{ mb: 4 }}>{content.subtitle || 'Subtítulo'}</Typography>
    <Button variant="contained" href={content.ctaLink || '#'} size="large">
      {content.ctaText || 'Acción'}
    </Button>
  </Box>
);

const FeaturesComponent: React.FC<ComponentProps> = ({ content = {} }) => (
  <Box sx={{ py: 8 }}>
    <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
      {content.title || 'Características'}
    </Typography>
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4 }}>
        {(content.items || []).map((item: any, index: number) => (
          <Box key={index} sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
            <Typography>{item.description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

const PricingComponent: React.FC<ComponentProps> = ({ content = {} }) => {
  const defaultPlans = [
    {
      name: 'Básico',
      price: '9.99',
      features: ['Característica 1', 'Característica 2', 'Característica 3']
    },
    {
      name: 'Pro',
      price: '29.99',
      features: ['Todo lo básico', 'Característica Pro 1', 'Característica Pro 2']
    },
    {
      name: 'Enterprise',
      price: '99.99',
      features: ['Todo lo pro', 'Soporte 24/7', 'Características personalizadas']
    }
  ];

  const plans = content.plans || defaultPlans;
  const title = content.title || 'Nuestros Planes';

  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        {title}
      </Typography>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4 }}>
          {plans.map((plan: any, index: number) => (
            <Box key={index} sx={{ 
              textAlign: 'center', 
              p: 3, 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <Typography variant="h5" sx={{ mb: 2 }}>{plan.name}</Typography>
              <Typography variant="h4" sx={{ mb: 3 }}>${plan.price}</Typography>
              {(plan.features || []).map((feature: string, i: number) => (
                <Typography key={i} sx={{ mb: 1 }}>{feature}</Typography>
              ))}
              <Button variant="contained" sx={{ mt: 3 }}>
                {plan.buttonText || 'Seleccionar'}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const TestimonialsComponent: React.FC<ComponentProps> = ({ content = {} }) => (
  <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
    <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
      {content.title || 'Testimonios'}
    </Typography>
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4 }}>
        {(content.items || []).map((item: any, index: number) => (
          <Box key={index} sx={{ 
            p: 3, 
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Typography sx={{ mb: 2, fontStyle: 'italic' }}>"{item.text}"</Typography>
            <Typography variant="subtitle1">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">{item.role}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

const TextComponent: React.FC<ComponentProps> = ({ content = {} }) => (
  <Typography sx={{ mb: 2 }}>{content.text || ''}</Typography>
);

const HeadingComponent: React.FC<ComponentProps> = ({ content = {} }) => {
  const variant = `h${content.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Typography variant={variant} sx={{ mb: 2 }}>{content.text || ''}</Typography>;
};

const ButtonComponent: React.FC<ComponentProps> = ({ content = {} }) => (
  <Button variant="contained" href={content.link || '#'}>
    {content.text || 'Click'}
  </Button>
);

const componentMap: Record<string, React.FC<ComponentProps>> = {
  hero: HeroComponent,
  features: FeaturesComponent,
  pricing: PricingComponent,
  testimonials: TestimonialsComponent,
  text: TextComponent,
  heading: HeadingComponent,
  button: ButtonComponent
};

const PreviewPage = () => {
  const { id } = useParams();
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        if (!id) return;
        const pageData = await landingPageService.getLandingPageById(id);
        if (pageData) {
          setComponents(pageData.components || []);
        }
      } catch (error) {
        console.error('Error loading preview:', error);
        toast.error('Error al cargar la vista previa');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [id]);

  if (loading) {
    return (
      <PreviewLayout>
        <Typography>Cargando vista previa...</Typography>
      </PreviewLayout>
    );
  }

  return (
    <PreviewLayout>
      <Box>
        {components.map((component, index) => {
          const Component = componentMap[component.type];
          return Component ? (
            <Component key={component.id || index} content={component.content} />
          ) : null;
        })}
      </Box>
    </PreviewLayout>
  );
};

export default PreviewPage;

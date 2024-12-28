import React from 'react';
import { Section } from '../base/Section';
import { Grid } from '../base/Grid';
import { Card } from '../base/Card';

interface ServicesProps {
  content: {
    title?: string;
    subtitle?: string;
    services?: Array<{
      title: string;
      description: string;
      icon?: string;
      price?: string;
    }>;
  };
  styles?: any;
  isEditing?: boolean;
  onEdit?: (content: any) => void;
}

export const Services: React.FC<ServicesProps> = ({
  content,
  styles,
  isEditing,
  onEdit
}) => {
  const {
    title = 'Nuestros Servicios',
    subtitle = 'Descubre lo que podemos hacer por ti',
    services = []
  } = content;

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background="default"
      spacing="large"
    >
      <Grid
        items={services}
        onItemEdit={(index, item) => {
          const newServices = [...services];
          newServices[index] = item;
          onEdit?.({ ...content, services: newServices });
        }}
        isEditing={isEditing}
        columns={3}
        renderItem={(service, index) => (
          <Card
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            price={service.price}
            isEditing={isEditing}
            onEdit={(editedService) => {
              const newServices = [...services];
              newServices[index] = editedService;
              onEdit?.({ ...content, services: newServices });
            }}
          />
        )}
      />
    </Section>
  );
};

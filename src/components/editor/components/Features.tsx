import React from 'react';
import { Section } from './base/Section';
import { Grid } from './base/Grid';
import { Card } from './base/Card';

interface Feature {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  content: {
    heading: string;
    subheading?: string;
    items: Feature[];
  };
  onEdit?: (content: any) => void;
  isEditing?: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ content, onEdit, isEditing }) => {
  const handleAddFeature = () => {
    const newFeature = {
      id: crypto.randomUUID(),
      title: 'Nueva Característica',
      description: 'Descripción de la característica'
    };
    onEdit?.({ ...content, items: [...content.items, newFeature] });
  };

  const handleDeleteFeature = (index: number) => {
    const updatedItems = [...content.items];
    updatedItems.splice(index, 1);
    onEdit?.({ ...content, items: updatedItems });
  };

  const handleFeatureEdit = (index: number, field: string, value: string) => {
    const updatedItems = content.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onEdit?.({ ...content, items: updatedItems });
  };

  return (
    <Section content={content} onEdit={onEdit} isEditing={isEditing}>
      <Grid
        items={content.items}
        renderItem={(feature: Feature, index) => (
          <Card
            title={feature.title}
            description={feature.description}
            onEdit={(field, value) => handleFeatureEdit(index, field, value)}
            isEditing={isEditing}
          />
        )}
        onAdd={isEditing ? handleAddFeature : undefined}
        onDelete={isEditing ? handleDeleteFeature : undefined}
        isEditing={isEditing}
      />
    </Section>
  );
};

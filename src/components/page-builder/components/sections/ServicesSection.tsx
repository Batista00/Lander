import React from 'react';
import { Service } from '@/types/components';

interface ServicesSectionProps {
  data: {
    title: string;
    subtitle: string;
    services: Service[];
  };
  isEditing?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ data, isEditing = false }) => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{data.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <div 
              key={service.id} 
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

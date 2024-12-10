import React from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
}

interface ServicesProps {
  title: string;
  subtitle: string;
  services: Service[];
}

export const Services: React.FC<ServicesProps> = ({
  title = 'Nuestros Servicios',
  subtitle = 'Lo que ofrecemos',
  services = []
}) => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          {subtitle}
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="pt-6"
            >
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

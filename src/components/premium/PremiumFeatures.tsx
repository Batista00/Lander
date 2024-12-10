import { usePremiumStore } from '../../modules/premium/PremiumManager';
import { Button } from '../ui/Button';

export function PremiumFeatures() {
  const { features, upgradeToPremiun, isPremium } = usePremiumStore();

  const categories = {
    customization: 'Personalización',
    components: 'Componentes',
    marketing: 'Marketing',
    productivity: 'Productividad',
    seo: 'SEO',
    security: 'Seguridad',
    integrations: 'Integraciones',
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  if (isPremium) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Características Premium Activadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900">{feature.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                Activado
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Mejora tu Landing Page con Premium
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Accede a todas las características premium y lleva tu landing page al siguiente nivel
        </p>
        <Button
          onClick={upgradeToPremiun}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Actualizar a Premium
        </Button>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {categories[category as keyof typeof categories]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Premium
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.name}
                  </h4>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Listo para mejorar tu landing page?
        </h3>
        <p className="text-gray-600 mb-6">
          Obtén acceso a todas las características premium por solo $19.99/mes
        </p>
        <Button
          onClick={upgradeToPremiun}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Actualizar Ahora
        </Button>
      </div>
    </div>
  );
}

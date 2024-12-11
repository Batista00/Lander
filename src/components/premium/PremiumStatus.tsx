import { usePremiumStore } from '../../modules/premium/PremiumManager';
import { Button } from '../ui/button';

interface PremiumStatusProps {
  featureId: string;
  children: React.ReactNode;
}

export function PremiumStatus({ featureId, children }: PremiumStatusProps) {
  const { isFeatureEnabled, upgradeToPremiun } = usePremiumStore();

  if (isFeatureEnabled(featureId)) {
    return <>{children}</>;
  }

  return (
    <div className="relative p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-blue-100">
      <div className="absolute top-2 right-2">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
          Premium
        </span>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mt-2">
          Característica Premium
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Actualiza a premium para acceder a esta característica
        </p>
        <Button
          onClick={upgradeToPremiun}
          className="mt-4 w-full justify-center text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          Actualizar a Premium
        </Button>
      </div>
    </div>
  );
}

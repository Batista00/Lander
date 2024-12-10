import { Button } from '../ui/Button';

interface PremiumFeatureProps {
  title: string;
  description: string;
  onUpgrade?: () => void;
}

export function PremiumFeature({ title, description, onUpgrade }: PremiumFeatureProps) {
  return (
    <div className="relative p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-blue-100">
      <div className="absolute top-2 right-2">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
          Premium
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-2">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full justify-center text-purple-600 border-purple-200 hover:bg-purple-50"
          onClick={onUpgrade}
        >
          Actualizar a Premium
        </Button>
      </div>
    </div>
  );
}

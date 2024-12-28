import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanStore } from '@/store/planStore';
import { differenceInDays } from 'date-fns';

export function TrialBanner() {
  const { currentPlan, trialEndDate, isTrialing } = usePlanStore();
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (trialEndDate) {
      const days = differenceInDays(new Date(trialEndDate), new Date());
      setDaysLeft(days);
    }
  }, [trialEndDate]);

  if (!isTrialing || dismissed || !currentPlan) return null;

  const getBannerStyle = () => {
    if (daysLeft <= 3) return 'bg-red-50 border-red-200 text-red-700';
    if (daysLeft <= 7) return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-blue-50 border-blue-200 text-blue-700';
  };

  const getMessageStyle = () => {
    if (daysLeft <= 3) return 'text-red-500';
    if (daysLeft <= 7) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <div className={`fixed bottom-4 right-4 max-w-md rounded-lg border p-4 shadow-lg ${getBannerStyle()}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 ${getMessageStyle()}`} />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">
                Período de prueba del plan {currentPlan.name}
              </p>
              <p className="text-sm mt-1">
                {daysLeft > 0 ? (
                  <>
                    Te quedan <span className="font-medium">{daysLeft} días</span> de prueba.
                    {daysLeft <= 3 && ' ¡No pierdas tus beneficios premium!'}
                  </>
                ) : (
                  'Tu período de prueba ha terminado'
                )}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => window.location.href = '/pricing'}
              variant="default"
            >
              Elegir Plan
            </Button>
            {daysLeft > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDismissed(true)}
              >
                Recordar Después
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

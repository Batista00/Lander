import { User } from '@/types/auth';

interface TrialInfo {
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

class TrialService {
  private TRIAL_DURATION_DAYS = 14;
  private TRIAL_KEY = 'premium_trial';

  startTrial(userId: string): TrialInfo {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + this.TRIAL_DURATION_DAYS);

    const trialInfo: TrialInfo = {
      startDate,
      endDate,
      isActive: true
    };

    localStorage.setItem(`${this.TRIAL_KEY}_${userId}`, JSON.stringify(trialInfo));
    return trialInfo;
  }

  getTrialInfo(userId: string): TrialInfo | null {
    const trialData = localStorage.getItem(`${this.TRIAL_KEY}_${userId}`);
    if (!trialData) return null;

    const trialInfo: TrialInfo = JSON.parse(trialData);
    const now = new Date();
    const endDate = new Date(trialInfo.endDate);

    // Actualizar el estado activo basado en la fecha actual
    trialInfo.isActive = now <= endDate;
    return trialInfo;
  }

  isTrialActive(userId: string): boolean {
    const trialInfo = this.getTrialInfo(userId);
    return !!trialInfo?.isActive;
  }

  getDaysRemaining(userId: string): number {
    const trialInfo = this.getTrialInfo(userId);
    if (!trialInfo || !trialInfo.isActive) return 0;

    const now = new Date();
    const endDate = new Date(trialInfo.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  canStartTrial(userId: string): boolean {
    const trialInfo = this.getTrialInfo(userId);
    return !trialInfo; // Solo se puede iniciar el trial si no hay información previa
  }
}

export const trialService = new TrialService();

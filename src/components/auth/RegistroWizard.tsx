import { useState } from 'react';
import type { UserData } from '@/lib/types';
import ProgressBar from './ProgressBar';
import StepRegistrate from './steps/StepRegistrate';
import StepComparte from './steps/StepComparte';
import StepPreparate from './steps/StepPreparate';

interface RegistroWizardProps {
  clientId: string;
  sheetsUrl: string;
}

export default function RegistroWizard({ clientId, sheetsUrl }: RegistroWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);

  const totalSteps = 3;

  function handleNextStep(data: UserData) {
    setUserData(data);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }

  function handleNext() {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} />

      <div>
        {currentStep === 1 && <StepRegistrate onNext={handleNextStep} clientId={clientId} sheetsUrl={sheetsUrl} />}

        {currentStep === 2 && <StepComparte onNext={handleNext} onBack={handleBack} />}

        {currentStep === 3 && <StepPreparate onBack={handleBack} />}
      </div>
    </div>
  );
}

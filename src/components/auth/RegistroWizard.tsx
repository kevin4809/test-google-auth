import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { UserData } from '@/lib/types';
import ProgressBar from './ProgressBar';
import StepRegistrate from './steps/StepRegistrate';
import StepComparte from './steps/StepComparte';
import StepPreparate from './steps/StepPreparate';

interface RegistroWizardProps {
  clientId: string;
  sheetsUrl: string;
}

const GOOGLE_CLIENT_ID = '593546219802-r7ipaalg4qncb4af4e4rfarg9n052hf6.apps.googleusercontent.com';

export default function RegistroWizard({ clientId, sheetsUrl }: RegistroWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);

  const totalSteps = 3;

  function handleNextStep(data: UserData) {
    setUserData(data);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <ProgressBar currentStep={currentStep} />

        <div>
          {currentStep === 1 && <StepRegistrate onNext={handleNextStep} clientId={clientId} sheetsUrl={sheetsUrl} />}

          {currentStep === 2 && <StepComparte onNext={handleNextStep} />}

          {currentStep === 3 && <StepPreparate />}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

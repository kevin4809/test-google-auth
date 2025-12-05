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
  const [currentStep, setCurrentStep] = useState(2);
  const [previousStep, setPreviousStep] = useState<number | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSteps = 3;

  function handleNextStep(data?: UserData) {
    if (data) {
      setUserData(data);
    }

    setPreviousStep(currentStep);
    setIsTransitioning(true);

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));

    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousStep(null);
    }, 700);
  }

  const getStepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <StepRegistrate onNext={handleNextStep} clientId={clientId} sheetsUrl={sheetsUrl} />;
      case 2:
        return <StepComparte onNext={() => handleNextStep()} />;
      case 3:
        return <StepPreparate />;
      default:
        return null;
    }
  };

  const getFullPageContent = (step: number) => {
    return (
      <div className='w-full'>
        <ProgressBar currentStep={step} />
        {getStepComponent(step)}
      </div>
    );
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className='relative overflow-hidden min-h-screen'>
        {previousStep !== null && (
          <div
            className='absolute inset-0 w-full'
            style={{
              animation: 'slideOutLeft 0.7s ease-in-out forwards',
            }}
          >
            {getFullPageContent(previousStep)}
          </div>
        )}

        <div
          className='relative w-full'
          style={{
            animation: isTransitioning ? 'slideInRight 0.7s ease-in-out forwards' : 'none',
          }}
        >
          {getFullPageContent(currentStep)}
        </div>

        <style>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideOutLeft {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(-100%);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </GoogleOAuthProvider>
  );
}

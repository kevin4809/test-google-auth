import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { UserData } from '@/lib/types';
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
  const [isAnimating, setIsAnimating] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  const totalSteps = 3;

  function handleNextStep(data: UserData) {
    setUserData(data);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);
  }

  function handleNextStepNoData() {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* <button className='fixed top-0 left-0 bg-amber-500 z-30' onClick={handleNextStep}>
        pasar
      </button> */}

      <div className='relative overflow-hidden '>
        <div
          className={`transition-all duration-500 ${currentStep > 1 && !isAnimating && 'absolute w-full h-full pointer-events-none  top-0 left-0'}`}
        >
          <StepRegistrate onNext={handleNextStep} clientId={clientId} sheetsUrl={sheetsUrl} />
        </div>

        <div
          className={`transition-all duration-500 w-full  ${
            currentStep === 2 && !isAnimating
              ? 'translate-x-0 opacity-100'
              : currentStep > 2
              ? 'absolute translate-x-0  pointer-events-auto   top-0 left-0'
              : 'translate-x-full opacity-0 absolute pointer-events-none  top-0 left-0'
          }`}
        >
          <StepComparte onNext={handleNextStepNoData} />
        </div>

        {currentStep > 2 && (
          <div
            className={`transition-all duration-500  ${
              currentStep === 3 && !isAnimating
                ? 'translate-x-0 opacity-100 pointer-events-auto'
                : 'translate-x-full opacity-0 absolute top-0 left-0 pointer-events-none'
            }`}
          >
            <StepPreparate />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

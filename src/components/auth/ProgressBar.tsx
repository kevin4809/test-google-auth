const steps = [
  { number: 1, label: 'Regístrate' },
  { number: 2, label: 'Comparte' },
  { number: 3, label: 'Prepárate' },
];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className='flex justify-between md:justify-center md:gap-[30px] items-stretch pt-[42px]'>
      {steps.map((step, index) => {
        const isSelected = currentStep === step.number;

        return (
          <div className='flex justify-center items-center gap-2 ' key={step.number}>
            <div
              className={`font-mono rounded-full text-[14px] p-2  w-6 h-6 flex justify-center items-center border border-light-cream ' ${
                isSelected ? 'bg-white text-purple' : ''
              }`}
            >
              <p> {step.number}</p>
            </div>
            <p className='text-[13px] tracking-[0.28px] font-mono md:text-[18px]'>{step.label}</p>
          </div>
        );
      })}
    </div>
  );
}

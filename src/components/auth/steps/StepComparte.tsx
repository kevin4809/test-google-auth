import ShareModal from '@/components/common/Share-modal';
import { useState } from 'react';

interface StepComparteProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepComparte({ onNext, onBack }: StepComparteProps) {
  const [useModal, setUseModal] = useState(false);

  return (
    <div className='mt-[22px] mb-[62px] overflow-hidden relative z-10 max-w-[980px] m-auto  '>
      <p className='text-[32px] leading-[128%] uppercase text-center mt-8 md:text-[48px] '>Comparte esta noche con alguien especial</p>

      <p className='text-[16px] font-mono text-center mt-[20px] mb-[54px] md:mb-[56px] md:text-[24px]'>
        Comparte la magia de Una y Mil Noches con alguien que ilumina tu historia. Dedícale esta canción, envía el link por la app que prefieras y
        deja que la música diga lo que las palabras no alcanzan.
      </p>

      <img className='w-full max-w-[396px] m-auto' src='/assets/album.webp' alt='album' />

      <div className='mt-8 md:mt-[36px] flex flex-col items-center'>
        <button
          onClick={() => setUseModal(true)}
          className='text-[16px] font-mono border border-light-cream rounded-[50px] w-[274px] py-2.5 bg-[rgba(143,96,166,0.20)]  '
        >
          Compartir
        </button>
      </div>

      <ShareModal state={useModal} changeState={setUseModal} />
    </div>
  );
}

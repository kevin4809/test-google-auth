import Buttons from '@/components/common/Buttons';
import ShareModal from '@/components/common/Share-modal';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import ProgressBar from '../ProgressBar';

export default function StepComparte({ onNext }: { onNext: () => void }) {
  const [useModal, setUseModal] = useState(false);

  return (
    <div className='background h-[1100px] md:h-[1150px]'>
      <div className='container_all'>
        <Navbar />
        <ProgressBar currentStep={2} />
        <div className='mt-[22px] pb-[62px]  relative z-10 max-w-[980px] m-auto   '>
          <p className='text-[32px] leading-[128%] uppercase text-center mt-8 md:text-[48px] '>Comparte esta noche con alguien especial</p>

          <p className='text-[16px] font-mono text-center mt-[20px] mb-[54px] md:mb-[56px] md:text-[24px]'>
            Comparte la magia de Una y Mil Noches con alguien que ilumina tu historia. Dedícale esta canción, envía el link por la app que prefieras y
            deja que la música diga lo que las palabras no alcanzan.
          </p>

          <div className=' flex flex-col items-center'>
            <Buttons onClick={() => setUseModal(true)} customClass='compartir max-w-[280px] bg-[rgba(143,96,166,0.20)]'>
              Compartir
            </Buttons>
          </div>

          <img className='w-full max-w-[396px] mt-8 md:mt-[36px]  m-auto' src='/assets/album.webp' alt='album' />

          <ShareModal state={useModal} changeState={setUseModal} onNext={onNext} />
        </div>
      </div>
    </div>
  );
}

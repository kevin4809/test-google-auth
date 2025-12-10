import Buttons from '@/components/common/Buttons';
import Navbar from '@/components/Navbar';
import ProgressBar from '../ProgressBar';

export default function StepPreparate() {
  return (
    <div className='background h-[1000px] md:h-[1150px]'>
      <div className='container_all'>
        <Navbar />
        <ProgressBar currentStep={3} />
        <div className='min-h-[50dvh]'>
          <p className='text-[48px] leading-[50px] uppercase text-center mt-[100px] md:text-[72px] md:leading-[70px] '>
            Gracias <br /> por participar
          </p>
          <p className='text-[18px] font-mono text-center mt-[20px] md:text-[28px]'>
            Ya te registraste y tu dedicatoria fue enviada. Si quieres seguir compartiendo el feeling, dedica la canción a tantas personas como
            quieras. El ganador será anunciado en las redes de Alejandro González, así que síguelo para no perderte nada del parche.
          </p>

          <div className=' mt-[54px] pb-[62px]  flex justify-center items-center flex-col md:flex-row md:gap-[22px]'>
            <a
              href='https://www.instagram.com/alejogonzalez/'
              className='border border-light-cream rounded-[50px] flex max-w-[280px] w-full justify-center items-center py-[10px] gap-[8px] bg-[rgba(143,96,166,0.20)]
'
            >
              <img src='/assets/social/instagram.svg' alt='instagram' />
              <p className='text-[16px] font-mono md:text-[18px]'>Seguir en Instagram</p>
            </a>

            <a
              href='/'
              className='text-[16px] font-mono mt-[12px]  flex max-w-[280px] w-full md:text-[18px] md:mt-0 py-[10px] rounded-[50px]  flex justify-center items-center'
            >
              <Buttons customClass='w-full bg-[rgba(143,96,166,0.20)]'>Participar de nuevo</Buttons>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

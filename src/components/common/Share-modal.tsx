import Buttons from './Buttons';

export default function ShareModal({ state, changeState, onNext }: { state: boolean; changeState: (state: boolean) => void; onNext: () => void }) {
  const ShareItems = [
    {
      name: 'Spotify',
      icon: '/assets/streaming/spotify.svg',
      url: 'https://open.spotify.com/intl-es/track/0sBVGVFQXGDBFIz4LDQsTu?si=7bcfe620860649e8',
    },
    {
      name: 'Apple Music',
      icon: '/assets/streaming/apple_music.svg',
      url: 'https://music.apple.com/co/song/una-y-mil-noches/1846687458',
    },
    {
      name: 'YouTube',
      icon: '/assets/streaming/youtube.svg',
      url: 'https://www.youtube.com/watch?v=2YN08Yj4UIk&list=RD2YN08Yj4UIk&start_radio=1',
    },
    {
      name: 'Amazon Music',
      icon: '/assets/streaming/amazon_music.svg',
      url: ' https://music.amazon.com/tracks/B0FWN1GVPF?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=CO&ref=dm_sh_G3rQ3cOM5YCe9v5otSWkJc38',
    },
    {
      name: 'Tidal',
      icon: '/assets/streaming/tidal.svg',
      url: 'https://tidal.com/album/467441816/u',
    },
    {
      name: 'SoundCloud',
      icon: '/assets/streaming/sound_cloud.svg',
      url: 'https://on.soundcloud.com/LTPRlpNzh7yemamIyV',
    },
  ];

  const handleShare = async (platform: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Una y Mil Noches',
          text: `Escucha "Una y Mil Noches" en ${platform}`,
          url: url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error al compartir:', error);

          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`z-20 w-[95%] max-w-[631px] fixed bottom-0 -translate-y-1/2 md:-translate-y-[10vh] lg:-translate-y-[22vh]  left-1/2 -translate-x-1/2 bg-[url('/assets/background_footer.webp')] bg-cover bg-center bg-no-repeat rounded-[20px] px-[14.5px] 
     transition md:px-[20px] duration-500 ${!state ? 'translate-x-[130%] opacity-0' : ' translate-0 opacity-100'}`}
    >
      <img onClick={() => changeState(false)} className='ml-auto p-8 cursor-pointer' src='/assets/x.svg' alt='x' />

      <p className='text-[24px] text-center leading-[120%] uppercase md:text-[36px]'>Envía tu dedicatoria</p>
      <p className='text-[16px] font-mono text-center mt-[20px] md:text-[24px]'>
        Elige tu plataforma favorita y comparte "Una y Mil Noches" con quien haga tu historia más bonita.
      </p>

      <div className='grid grid-cols-2 gap-[8px] py-[32px] gap-y-[14px] md:gap-x-[22px]'>
        {ShareItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleShare(item.name, item.url)}
            className='flex  items-center justify-center gap-2 hover:opacity-80 transition-opacity border border-light-cream rounded-[50px] py-[13px] cursor-pointer'
          >
            <img src={item.icon} alt={item.name} className='w-[24px] h-[24px]' />
            <p className='text-[14px] font-mono'>{item.name}</p>
          </button>
        ))}
      </div>

      <Buttons
        onClick={() => {
          changeState(false);
          onNext();
        }}
        customClass='w-[200px] mx-auto mb-[24px] bg-[rgba(143,96,166,0.20)]'
      >
        Finalizar
      </Buttons>
    </div>
  );
}

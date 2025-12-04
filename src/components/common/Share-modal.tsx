export default function ShareModal({ state, changeState }: { state: boolean; changeState: (state: boolean) => void }) {
  const ShareItems = [
    {
      name: 'Spotify',
      icon: '/assets/streaming/spotify.svg',
      url: 'https://open.spotify.com/intl-es',
    },
    {
      name: 'Apple Music',
      icon: '/assets/streaming/apple_music.svg',
      url: 'https://music.apple.com',
    },
    {
      name: 'YouTube',
      icon: '/assets/streaming/youtube.svg',
      url: 'https://music.youtube.com',
    },
    {
      name: 'Amazon Music',
      icon: '/assets/streaming/amazon_music.svg',
      url: 'https://music.amazon.com',
    },
    {
      name: 'Tidal',
      icon: '/assets/streaming/tidal.svg',
      url: 'https://tidal.com',
    },
    {
      name: 'SoundCloud',
      icon: '/assets/streaming/sound_cloud.svg',
      url: 'https://soundcloud.com',
    },
  ];

  return (
    <div className={`w-[90%]  z-20 absolute bottom-0 left-0 bg-[url('/assets/background_footer.webp')] bg-cover bg-center bg-no-repeat rounded-[20px] w-full px-[14.5px]
     transition duration-500 ${!state ? 'translate-x-[130%]' : ' translate-0'}`}>
      <img onClick={() => changeState(false)} className='ml-auto p-8' src='/assets/x.svg' alt='x' />

      <p className='text-[24px] text-center leading-[120%] uppercase md:text-[36px]'>
        Envía tu dedicatoria
      </p>
      <p className='text-[16px] font-mono text-center mt-[20px] md:text-[24px]'>
        Elige tu plataforma favorita y comparte "Una y Mil Noches" con quien haga tu historia más bonita.
      </p>

      <div className='grid grid-cols-2 gap-[8px] py-[32px] gap-y-[14px]'>
        {ShareItems.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex  items-center justify-center gap-2 hover:opacity-80 transition-opacity border border-light-cream rounded-[50px] py-[13px]'
          >
            <img src={item.icon} alt={item.name} className='w-[24px] h-[24px]' />
            <p className='text-[14px] font-mono'>{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

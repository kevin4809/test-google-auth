import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ButtonsProps {
  href?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  customClass?: string;
  onclick?: () => void;
}

const Buttons = ({ href = '', children, type, customClass = '', onClick }: ButtonsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setIsHovered((prev) => !prev);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const baseClasses = `border cursor-pointer border-light-cream rounded-[50px] flex flex-row items-center justify-center gap-2 p-[10px] md:text-[18px] md:py-[12px] font-mono text-center transition-all duration-300 ease-in-out whitespace-nowrap ${customClass}`;

  const paddingClasses = isHovered ? 'md:px-[24px] px-[16px]' : 'md:px-[18px] px-[10px]';

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovered(false);
  };

  return href ? (
    <a href={href} className={`${baseClasses} ${paddingClasses}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span>{children}</span>
      <img
        src='/assets/arrow.svg'
        alt='arrow'
        className={`transition-all duration-300 ease-in-out shrink-0 ${
          isHovered ? 'opacity-100 translate-x-0 w-4 h-4' : 'opacity-0 -translate-x-2 w-0 h-4'
        }`}
      />
    </a>
  ) : (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${paddingClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{children}</span>
      <img
        src='/assets/arrow.svg'
        alt='arrow'
        className={`transition-all duration-300 ease-in-out shrink-0 ${
          isHovered ? 'opacity-100 translate-x-0 w-4 h-4' : 'opacity-0 -translate-x-2 w-0 h-4'
        }`}
      />
    </button>
  );
};

export default Buttons;

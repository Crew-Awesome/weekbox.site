'use client';

import { FooterPhaserGame } from '../atoms/FooterPhaserGame';

export function Footer() {
  return (
    <footer className="w-full mt-auto relative">
      
      {/* "Air" - Phaser Canvas sitting ON TOP OF the floor visually (z-index + negative margin) */}
      <div className="w-full relative z-30 -mb-[60px] ">
        <div className="">
          <FooterPhaserGame />
        </div>
      </div>

      {/* "Floor" - The gradient starts here. Because of the negative margin above, 
          the canvas now overlaps this area perfectly. */}
      <div className="w-full pt-[140px] flex flex-col gap-6 overflow-hidden items-center justify-center bg-gradient-to-b from-[#050708] via-[#0b1011] to-[var(--wb-surface-container)] relative z-10">
      
      {/* Giant Full-Width Text with Interactive Logo as 'O' */}
      <div 
        className="w-full flex justify-center items-center select-none"
        style={{ fontSize: '15vw', lineHeight: '0.8', letterSpacing: '-0.04em' }}
      >
        <span 
          className="font-black text-white"
          style={{ fontFamily: 'var(--wb-font-primary)' }}
        >
          WEEKB
        </span>
        <img 
          src="/assets/images/icon.webp" 
          alt=""
          className="inline-block"
          style={{ 
            height: '0.75em', 
            width: 'auto', 
            margin: '0 0.02em',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
          }} 
          draggable="false"
        />
        <span 
          className="font-black text-white"
          style={{ fontFamily: 'var(--wb-font-primary)' }}
        >
          X
        </span>
      </div>

      {/* Bottom: License Text */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 text-center text-xs md:text-sm text-[var(--wb-on-surface-variant)] pb-8 px-6 relative z-10">
        <span>© {new Date().getFullYear()} Awesome Crew. Released under the MIT License.</span>
        <span className="hidden md:inline text-[var(--wb-outline-variant)]">•</span>
        <span>Not affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.</span>
      </div>
      
      </div>
    </footer>
  );
}

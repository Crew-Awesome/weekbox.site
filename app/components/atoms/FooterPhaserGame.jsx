'use client';

import { useEffect, useRef } from 'react';

export function FooterPhaserGame() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    let game;

    import('phaser').then((Phaser) => {
      if (!containerRef.current) return;

      const config = {
        type: Phaser.default.AUTO,
        parent: containerRef.current,
        scale: {
          mode: Phaser.default.Scale.RESIZE,
          parent: containerRef.current,
          width: '100%',
          height: '100%'
        },
        transparent: true,
        physics: {
          default: 'arcade'
        },
        input: {
          mouse: {
            preventDefaultWheel: false,
            preventDefaultDown: false
          },
          touch: {
            capture: false
          }
        },
        scene: {
          preload: preload,
          create: create,
        }
      };

      game = new Phaser.default.Game(config);
      gameRef.current = game;

      function preload() {
        // Load FNF Sparrow Atlas XML
        this.load.atlasXML('bf', '/assets/game/BOYFRIEND.png', '/assets/game/BOYFRIEND.xml');
      }

      function create() {
        const { width, height } = this.scale;
        
        // Create idle animation from XML frames
        this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNames('bf', { prefix: 'BF idle dance', start: 0, end: 13, zeroPad: 4 }),
          frameRate: 24,
          repeat: 0
        });

        const bf = this.add.sprite(0, 0, 'bf', 'BF idle dance0000');
        bf.setOrigin(0, 0); 
        bf.setScale(0.5); 
        
        // Play first beat immediately so the frame is set
        bf.play('idle', true);
        
        // Function to reposition based on current screen size
        const updatePosition = (w, h) => {
          // Move to right side, but prevent him from going off-screen on very small mobiles
          bf.x = Math.max(w - 280, 20); 
          // Always pin feet to bottom
          bf.y = h - bf.displayHeight;
        };
        
        // Initial setup (now displayHeight will be correct)
        updatePosition(width, height);

        // Update on browser resize
        this.scale.on('resize', (gameSize) => {
          updatePosition(gameSize.width, gameSize.height);
        });
        
        // 100 BPM = 1 beat every 600ms
        this.time.addEvent({
            delay: 600,
            callback: () => {
                bf.play('idle', true);
            },
            loop: true
        });
      }
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-[1200px] h-[280px] mx-auto relative z-20" 
    />
  );
}

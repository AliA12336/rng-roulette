import { useEffect, useRef } from 'react';
import { Wheel } from 'spin-wheel';
import confetti from 'canvas-confetti';

import '../App.css';
import { useChoices } from '@/hooks/useChoices';
import { CirclePlay } from 'lucide-react';
import { Button } from './ui/button';


const triggerConfetti = (el: HTMLDivElement | null) => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x =(rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: x, y: y },
      colors: ["#6f4e37", "#d3cfc7", "#f5f5dc"]
    });
  };

const generateColors = (lengthOfItems: number) => {
    const colors = [];
    for (let i = 0; i < lengthOfItems; i++) {
        colors.push('#f5f5dc')
    }
    return colors;
}

export default function SpinWheel() {
  const wheelContainerRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<Wheel | null>(null);
  const { choices } = useChoices();

  useEffect(() => {
    const container = wheelContainerRef.current;
    if (!container) return;

    if (wheelRef.current) {
        wheelRef.current.destroy()
        wheelRef.current = null;
    }

    if(choices.length === 0) return;

    const items = choices.map(choice => ({ label: choice.input }));
    const colors = items.length ? generateColors(items.length) : [];
 
    const wheel = new Wheel(wheelContainerRef.current!, {items, itemLabelRadiusMax: 0.1, itemBackgroundColors: colors, 
      itemLabelFontSizeMax: 40, itemLabelFontSizeMin: 40, itemLabelColors: ['#6f4e37']});
    wheelRef.current = wheel;

    wheel.onSpin = () => {
        wheelContainerRef.current?.classList.add('wheel-glow');
    }

    wheel.onRest = (e: { currentIndex: number }) => {
        console.log('Stopped at index:', e.currentIndex);
        wheelContainerRef.current?.classList.remove('wheel-glow');
        triggerConfetti(wheelContainerRef.current);
    }

    return () => {
      if (wheelContainerRef.current) {
      wheelContainerRef.current.innerHTML = '';
      }
      wheelRef.current = null;
    };
  }, [choices]);

  const handleSpin = () => {
    if (wheelRef.current) {
      const itemIndex = Math.floor(Math.random() * 3);
      wheelRef.current.spinToItem(itemIndex, 3000, true, 2, 1);
    }
  };
  
  return (
  <div className="flex flex-col items-center">
    <div className="relative w-[70vw] max-w-[400px] aspect-square rounded-full bg-[#6f4e37] border-[5px] border-white flex justify-center items-center">
      <div
            className="wheel w-[85%] h-[85%]"
            ref={wheelContainerRef}
            />
      <svg
          viewBox="0 0 400 350"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: "45%",
            bottom: "5%",
            }}>
          <path
          className="wheel-pointer-border"
          d="M 3.85 15.4 A 15.4 15.4 90 0 1 34.65 15.4 L 26.18 53.515 Q 20.02 70.455 14.245 53.13 Z"
          fill="#6f4e37"
          />
          <path
          className="wheel-pointer"
          d="M 3.5 14 A 14 14 0 0 1 31.5 14 L 23.8 48.65 Q 18.2 64.05 12.95 48.3 Z"
          fill="#d3cfc7"
          />
          <circle className="wheel-pointer-circle" cx="18" cy="10" r="5" fill="#6f4e37" />
          </svg>
          
    </div>
             <Button className="spin-button mb-10 text-[#e07b39] hover:border-transparent flex-col items-center gap-0" style={{ backgroundColor: 'transparent', padding: 0 }} onClick={handleSpin}><CirclePlay /><span style={{ margin: 0, padding: 0, lineHeight: 1}}>Spin</span></Button>
         
  </div>
            
  );
}

import { useEffect, useRef } from 'react';
import { Wheel } from 'spin-wheel';
import confetti from 'canvas-confetti';

import '../App.css';
import { useChoices } from '@/hooks/useChoices';


const triggerConfetti = (el: HTMLDivElement | null) => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x =(rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: x, y: y },
      colors: ["#6f4e37"]
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
    <div>
        <div style={{ position: 'relative', width: '400px', height: '350px' }}>
            <div className="wheel-pointer-border" style={{position: 'absolute', backgroundColor: "#6f4e37", width: '400px', height: '350px', left: "45%", bottom: "5%", clipPath: 'path("M 3.85 15.4 A 15.4 15.4 90 0 1 34.65 15.4 L 26.18 53.515 Q 20.02 70.455 14.245 53.13 Z")'}}>
              <div className="wheel-pointer" style={{position: 'absolute', left: ".3%", top: ".3%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5dc", width: '400px', height: '350px', clipPath: 'path("M 3.5 14 A 14 14 0 0 1 31.5 14 L 23.8 48.65 Q 18.2 64.05 12.95 48.3 Z")'}}>
                <div className="wheel-pointer-circle" style={{position: 'absolute', width: "10px", height: "10px", borderRadius: "50%", left: "3%", top: "3%", backgroundColor: "#6f4e37"}}/>
              </div>
            </div>
            <div
            className="wheel"
                ref={wheelContainerRef}
                style={{ width: 350, height: 350, margin: 'auto' }}
            />
            {/* <button onClick={handleSpin} style={{width: 400}}>Spin</button> */}
        </div>
    </div>
  );
}

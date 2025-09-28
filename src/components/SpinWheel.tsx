import { useEffect, useRef, useState, type SetStateAction } from 'react';
import { Wheel } from 'spin-wheel';
import confetti from 'canvas-confetti';
import '../App.css';


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

const isTooDark = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 40;
}

const generateRandomColors = (lengthOfItems: number) => {
    const colors = [];
    for (let i = 0; i < lengthOfItems; i++) {
        let color = '#000000';
        do {
            color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        } while (isTooDark(color));
        colors.push(color);
    }
    return colors;
}

export default function SpinWheel() {
  const wheelContainerRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<Wheel | null>(null);

  const [labelsInput, setLabelsInput] = useState('Dog, Cat, Fish');
  const [items, setItems] = useState([
    { label: 'Dog'},
    { label: 'Cat'},
    { label: 'Fish'}
  ])
    const [colors, setColors] = useState(['#ff9999', '#99ff99', '#9999ff'])

  useEffect(() => {
    const container = wheelContainerRef.current;
    if (!container) return;

    if (wheelRef.current) {
        wheelRef.current.destroy()
        wheelRef.current = null;
    }
 
    const wheel = new Wheel(wheelContainerRef.current!, {items, itemLabelRadiusMax: 0.5, itemBackgroundColors: colors, 
      itemLabelFontSizeMax: 40,});
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
  }, [items, colors]);

  const handleLabelsChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLabelsInput(e.target.value);
  };

  const updateWheelItems = () => {
    const newLabels = labelsInput
      .split(',')
      .map(label => label.trim())
      .filter(label => label.length > 0);

    const newItems = newLabels.map(label => ({ label }));
    setItems(newItems);

    const newColors = generateRandomColors(newItems.length);
    setColors(newColors);
  };

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
                <circle className="wheel-pointer-circle" style={{position: 'absolute', width: "10px", height: "10px", borderRadius: "50%", left: "3%", top: "3%", backgroundColor: "#6f4e37"}}/>
              </div>
            </div>
            <div
            className="wheel"
                ref={wheelContainerRef}
                style={{ width: 350, height: 350, margin: 'auto' }}
            />
            {/* <button onClick={handleSpin} style={{width: 400}}>Spin</button> */}
            {/* <button onClick={updateWheelItems} style={{marginLeft: '10px', width: 400}}> */}
                {/* Update Wheel */}
            {/* </button> */}
        </div>
    </div>
  );
}

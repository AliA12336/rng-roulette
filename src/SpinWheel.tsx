import { useEffect, useRef } from 'react';
import { Wheel } from 'spin-wheel';

export default function SpinWheel() {
  const wheelContainerRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (!wheelContainerRef.current || wheelRef.current) {
        return;
    }

    const props = {
      items: [
        { label: 'Apple' },
        { label: 'Banana' },
        { label: 'Cherry' },
      ],
      itemBackgroundColors: ['#ff9999', '#99ff99', '#9999ff'],
      itemLabelFontSizeMax: 40,
    };

    const wheel = new Wheel(wheelContainerRef.current, props);
    wheelRef.current = wheel;

    // Optional events
    wheel.onRest = (e: { currentIndex: any; }) => console.log('Stopped at index:', e.currentIndex);

    return () => {
      // Optional: cleanup
      if (wheelContainerRef.current) {
      wheelContainerRef.current.innerHTML = '';
      }
      wheelRef.current = null;
    };
  }, []);

  const handleSpin = () => {
    if (wheelRef.current) {
      const itemIndex = Math.floor(Math.random() * 3); // Pick a random item
      wheelRef.current.spinToItem(itemIndex, 3000, true, 2, 1);
    }
  };

  return (
    <div>
      <div
        ref={wheelContainerRef}
        style={{ width: 400, height: 400, margin: 'auto' }}
      />
      <button onClick={handleSpin}>Spin</button>
    </div>
  );
}

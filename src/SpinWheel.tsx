import { useEffect, useRef, useState, type SetStateAction } from 'react';
import { Wheel } from 'spin-wheel';

const generateRandomColors = (lengthOfItems: number) => {
    const colors = []
    for (let i = 0; i < lengthOfItems; i++) {
        colors.push('#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'));
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

    // Optional events
    wheel.onRest = (e: { currentIndex: number }) => console.log('Stopped at index:', e.currentIndex);

    return () => {
      // Optional: cleanup
      if (wheelContainerRef.current) {
      wheelContainerRef.current.innerHTML = '';
      }
      wheelRef.current = null;
    };
  }, [items, colors]);

  const handleLabelsChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLabelsInput(e.target.value);
  };

  // Handler for "Update Wheel" button click
  const updateWheelItems = () => {
    const newLabels = labelsInput
      .split(',')
      .map(label => label.trim())
      .filter(label => label.length > 0);

    // Create new items array
    const newItems = newLabels.map(label => ({ label }));
    setItems(newItems);

    const newColors = generateRandomColors(newItems.length);
    setColors(newColors);
  };

  const handleSpin = () => {
    if (wheelRef.current) {
      const itemIndex = Math.floor(Math.random() * 3); // Pick a random item
      wheelRef.current.spinToItem(itemIndex, 3000, true, 2, 1);
    }
  };

  return (
    <div>
        <div style={{ position: 'relative', width: '400px', height: '400px' }}>
            <div className="wheel-pointer"></div>
            <div
                ref={wheelContainerRef}
                style={{ width: 400, height: 400, margin: 'auto' }}
            />
            <button onClick={handleSpin}>Spin</button>
            <label>
                Enter labels (comma separated):
                <input
                type="text"
                value={labelsInput}
                onChange={handleLabelsChange}
                style={{ width: '300px', marginLeft: '10px' }}
                />
            </label>
            <button onClick={updateWheelItems} style={{marginLeft: '10px'}}>
                Update Wheel
            </button>
        </div>
    </div>
  );
}

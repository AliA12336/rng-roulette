import { useEffect, useRef, useState } from 'react';
import { Wheel } from 'spin-wheel';

export default function SpinWheel() {
  const wheelContainerRef = useRef(null);
  const wheelRef = useRef(null);

  const [labelsInput, setLabelsInput] = useState('Dog, Cat, Fish');
  const [items, setItems] = useState([
    { label: 'Dog'},
    { label: 'Cat'},
    { label: 'Fish'}
  ])

  useEffect(() => {
    if (!wheelContainerRef.current || wheelRef.current) {
        return;
    }

    if (wheelRef.current?.destroy) {
        wheelRef.current.destroy()
    }

    const wheel = new Wheel(wheelContainerRef.current, {items, itemLabelRadiusMax: 0.5, itemBackgroundColors: ['#ff9999', '#99ff99', '#9999ff'],
      itemLabelFontSizeMax: 40,});
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
  }, [items]);

  const handleLabelsChange = (e) => {
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
  };

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
  );
}

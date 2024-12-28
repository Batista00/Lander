import React from 'react';

interface SliderProps {
  defaultValue: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  defaultValue,
  min,
  max,
  step,
  onValueChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseFloat(event.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue[0]}
      onChange={handleChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  );
};

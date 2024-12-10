import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, className = '', children }: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className = '', error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
        shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary 
        disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
        ${error ? 'border-red-500' : ''} 
        ${className}`}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ className = '', error, options, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
        shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
        disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
        ${error ? 'border-red-500' : ''} 
        ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function TextArea({ className = '', error, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
        shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
        disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
        ${error ? 'border-red-500' : ''} 
        ${className}`}
    />
  );
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
}

export function Checkbox({ className = '', children, error, ...props }: CheckboxProps) {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        {...props}
        className={`h-4 w-4 rounded border-gray-300 text-primary 
          focus:ring-primary disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}`}
      />
      <span className="text-sm text-gray-700">{children}</span>
    </label>
  );
}

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  showValue?: boolean;
}

export function Slider({ className = '', error, showValue = true, ...props }: SliderProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="range"
        {...props}
        className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200
          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-primary
          ${error ? '[&::-webkit-slider-thumb]:bg-red-500' : ''}`}
      />
      {showValue && <span className="w-12 text-sm text-gray-700">{props.value}</span>}
    </div>
  );
}

interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
}

export function ColorPicker({ className = '', error, ...props }: ColorPickerProps) {
  return (
    <input
      type="color"
      {...props}
      className={`h-8 w-8 cursor-pointer appearance-none rounded border border-gray-300 p-0
        [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded
        ${error ? 'border-red-500' : ''} 
        ${className}`}
    />
  );
}

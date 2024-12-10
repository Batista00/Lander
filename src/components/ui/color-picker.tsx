import { cn } from "@/lib/utils";

interface ColorOption {
  value: string;
  label: string;
  color: string;
}

interface ColorPickerProps {
  label: string;
  colors: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({
  label,
  colors,
  value,
  onChange,
  className
}: ColorPickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={cn(
              'w-full h-10 rounded-md border-2 transition-all',
              value === color.value 
                ? 'border-blue-600 ring-2 ring-blue-600 ring-opacity-50' 
                : 'border-gray-200 hover:border-gray-300',
              color.value.includes('white') && 'bg-gray-800'
            )}
            style={{ backgroundColor: color.color }}
            title={color.label}
          >
            {value === color.value && (
              <div className="flex items-center justify-center h-full">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

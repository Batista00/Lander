import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { ImagePlus, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  width?: number;
  height?: number;
  accept?: string;
}

export function ImageUpload({
  label,
  value,
  onChange,
  className,
  width = 200,
  height = 200,
  accept = "image/*"
}: ImageUploadProps) {
  const [preview, setPreview] = useState(value);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange(imageUrl);
      toast.success('Imagen cargada correctamente');
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      toast.error('Error al cargar la imagen');
    }
  }, [onChange]);

  const handleRemoveImage = useCallback(() => {
    setPreview(undefined);
    onChange('');
  }, [onChange]);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="flex flex-col items-center gap-4">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={label}
              className="rounded-lg object-cover"
              style={{ width, height }}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 border-dashed",
              "border-gray-200 hover:border-gray-300 transition-colors cursor-pointer",
              "bg-gray-50 hover:bg-gray-100"
            )}
            style={{ width, height }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Haz clic para subir</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept={accept}
            />
          </label>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EditorSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function EditorSection({ title, children, defaultOpen = false }: EditorSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="space-y-4 px-4 py-3">{children}</div>}
    </div>
  );
}

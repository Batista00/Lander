import { ArrowUp, ArrowDown, Copy, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Component } from '@/types/landing';

interface ComponentToolbarProps {
  component: Component;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function ComponentToolbar({
  component,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onEdit,
  isFirst,
  isLast,
}: ComponentToolbarProps) {
  return (
    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg shadow-sm">
      <div className="flex items-center gap-1 p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMoveUp}
          disabled={isFirst}
          className="h-8 w-8"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMoveDown}
          disabled={isLast}
          className="h-8 w-8"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <div className="w-px h-4 bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={onDuplicate}
          className="h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-8 w-8 text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

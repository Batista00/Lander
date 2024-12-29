import React, { useState } from 'react';
import { AIQuickStartDialog } from './AIQuickStartDialog';

interface AIQuickStartWrapperProps {
  onClose: () => void;
}

export function AIQuickStartWrapper({ onClose }: AIQuickStartWrapperProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <AIQuickStartDialog
      open={isOpen}
      onClose={handleClose}
    />
  );
}

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  disableClickOutside?: boolean;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  disableClickOutside = false,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        onInteractOutside={(e) => {
          if (disableClickOutside) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

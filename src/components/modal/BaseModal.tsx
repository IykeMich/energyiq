import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
  disableCloseOnInteractOutside?: boolean;
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl'
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
  maxWidth = 'lg',
  showCloseButton = true,
  disableCloseOnInteractOutside = false // Default to false (disable outside click)
}) => {
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogOverlay
        //backdrop-blur-sm
        className="
          fixed inset-0 z-50
          bg-[#121212]/80
          transition-opacity
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
        "
      />
      <DialogContent 
        showCloseButton={showCloseButton} 
        onInteractOutside={(e) => {
          if (disableCloseOnInteractOutside) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (disableCloseOnInteractOutside) {
            e.preventDefault();
          }
        }}
        className={`${maxWidthClasses[maxWidth]} w-full rounded-2xl bg-[#121212] p-6 shadow-xl ${className}`}
        aria-describedby={description ? "modal-description" : undefined}
        role="dialog"
        aria-modal="true"
      >
        <DialogHeader>
          {title ? (
            <DialogTitle id="modal-title">{title}</DialogTitle>
          ) : (
            <VisuallyHidden>
              <DialogTitle id="modal-title">Modal</DialogTitle>
            </VisuallyHidden>
          )}
          {description ? (
            <DialogDescription id="modal-description">{description}</DialogDescription>
          ) : (
            <VisuallyHidden>
              <DialogDescription id="modal-description">Modal content</DialogDescription>
            </VisuallyHidden>
          )}
        </DialogHeader>
        <div role="main" aria-labelledby="modal-title" aria-describedby="modal-description">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
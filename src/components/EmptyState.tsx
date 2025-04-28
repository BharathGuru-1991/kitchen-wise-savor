
import React from 'react';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = ({ title, description, action, className = '' }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button 
          onClick={action.onClick} 
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;


import React from 'react';
import { getExpiryStatus, getDaysUntilExpiry } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ExpiryBadgeProps {
  expiryDate: Date;
  className?: string;
  showProgress?: boolean;
}

const ExpiryBadge: React.FC<ExpiryBadgeProps> = ({ 
  expiryDate, 
  className = '',
  showProgress = false
}) => {
  const status = getExpiryStatus(expiryDate);
  const daysLeft = getDaysUntilExpiry(expiryDate);
  
  const getStatusText = () => {
    if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} days ago`;
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft === 1) return 'Expires tomorrow';
    return `Expires in ${daysLeft} days`;
  };

  const getBadgeColor = () => {
    switch (status) {
      case 'expired':
        return 'bg-destructive text-destructive-foreground';
      case 'critical':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-amber-500 text-white';
      case 'safe':
        return 'bg-green-500 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case 'expired':
        return 'bg-destructive';
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'safe':
        return 'bg-green-500';
      default:
        return 'bg-secondary';
    }
  };

  const getProgressValue = () => {
    if (daysLeft < 0) return 0;
    // Assuming max shelf life is 14 days for calculation purposes
    const maxShelfLife = 14;
    return Math.min(Math.max((daysLeft / maxShelfLife) * 100, 0), 100);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className={cn('px-2 py-1 text-xs font-medium rounded-md inline-flex items-center justify-center', getBadgeColor())}>
        {getStatusText()}
      </span>
      
      {showProgress && (
        <Progress 
          value={getProgressValue()}
          className="h-1.5"
          indicatorClassName={getProgressColor()}
        />
      )}
    </div>
  );
};

export default ExpiryBadge;

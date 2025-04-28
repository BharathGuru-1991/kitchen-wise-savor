
import React from 'react';
import { differenceInDays, isPast } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ExpiryBadgeProps {
  expiryDate: Date;
  purchaseDate?: Date;
  showProgressBar?: boolean;
  className?: string;
}

const ExpiryBadge: React.FC<ExpiryBadgeProps> = ({ 
  expiryDate, 
  purchaseDate, 
  showProgressBar = false,
  className = ''
}) => {
  const today = new Date();
  const isExpired = isPast(expiryDate);
  const daysUntilExpiry = differenceInDays(expiryDate, today);
  
  let status: 'fresh' | 'warning' | 'danger' | 'expired';
  let badgeText: string;

  if (isExpired) {
    status = 'expired';
    badgeText = 'Expired';
  } else if (daysUntilExpiry <= 1) {
    status = 'danger';
    badgeText = 'Today';
  } else if (daysUntilExpiry <= 3) {
    status = 'danger';
    badgeText = `${daysUntilExpiry} days`;
  } else if (daysUntilExpiry <= 7) {
    status = 'warning';
    badgeText = `${daysUntilExpiry} days`;
  } else {
    status = 'fresh';
    badgeText = `${daysUntilExpiry} days`;
  }
  
  const badgeVariants = {
    expired: 'bg-destructive text-destructive-foreground',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    fresh: 'bg-green-100 text-green-800 border-green-200'
  };
  
  // Calculate progress percentage if we have a purchase date
  let progressPercentage = 0;
  if (showProgressBar && purchaseDate) {
    const totalDays = differenceInDays(expiryDate, purchaseDate);
    const elapsedDays = differenceInDays(today, purchaseDate);
    if (totalDays > 0) {
      progressPercentage = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
    }
  }
  
  const progressColorClass = 
    status === 'expired' ? 'bg-destructive' :
    status === 'danger' ? 'bg-red-500' :
    status === 'warning' ? 'bg-amber-500' :
    'bg-green-500';

  return (
    <div className={className}>
      <Badge variant="outline" className={cn(
        'font-normal',
        badgeVariants[status]
      )}>
        {badgeText}
      </Badge>
      
      {showProgressBar && (
        <Progress 
          value={progressPercentage} 
          className="h-1 mt-1"
          // Remove the indicatorClassName prop as it doesn't exist
          // Use className directly for styling the progress bar
        />
      )}
    </div>
  );
};

export default ExpiryBadge;

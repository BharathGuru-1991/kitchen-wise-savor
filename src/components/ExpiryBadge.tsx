
import React from 'react';
import { getExpiryStatus, getDaysUntilExpiry } from '@/utils/dateUtils';

interface ExpiryBadgeProps {
  expiryDate: Date;
  className?: string;
}

const ExpiryBadge: React.FC<ExpiryBadgeProps> = ({ expiryDate, className = '' }) => {
  const status = getExpiryStatus(expiryDate);
  const daysLeft = getDaysUntilExpiry(expiryDate);
  
  const getStatusText = () => {
    if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} days ago`;
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft === 1) return 'Expires tomorrow';
    return `Expires in ${daysLeft} days`;
  };

  return (
    <span className={`expiry-badge expiry-${status} ${className}`}>
      {getStatusText()}
    </span>
  );
};

export default ExpiryBadge;

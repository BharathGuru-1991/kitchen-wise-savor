
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysUntilExpiry = (expiryDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const getExpiryStatus = (expiryDate: Date): 'expired' | 'critical' | 'warning' | 'safe' => {
  const daysLeft = getDaysUntilExpiry(expiryDate);
  
  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 2) return 'critical';
  if (daysLeft <= 5) return 'warning';
  return 'safe';
};

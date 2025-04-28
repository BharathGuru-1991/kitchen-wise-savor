
import { formatDate } from './dateUtils';

export type FoodCategory = 
  | 'prepared_meals' 
  | 'fruits_vegetables' 
  | 'bakery' 
  | 'dairy' 
  | 'meat' 
  | 'drinks' 
  | 'other';

export type DonationStatus = 
  | 'available' 
  | 'claimed' 
  | 'in_transit' 
  | 'delivered' 
  | 'canceled';

export interface FoodDonation {
  id: string;
  title: string;
  description: string;
  quantity: {
    value: number;
    unit: string;
  };
  category: FoodCategory;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  temperature: number | null;
  availableFrom: Date;
  availableUntil: Date;
  status: DonationStatus;
  donorId: string;
  claimedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  packagingInfo?: string;
  allergens?: string[];
  dietaryInfo?: string[];
  safetyChecklist?: {
    properlyStored: boolean;
    temperatureControlled: boolean;
    contaminationFree: boolean;
    freshlyPrepared: boolean;
  };
  images?: string[];
}

export interface Organization {
  id: string;
  name: string;
  type: 'donor' | 'recipient';
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  availablePickupHours?: {
    start: string;
    end: string;
  }[];
  capacity?: number;
  impactMetrics?: {
    totalDonations: number;
    mealsSaved: number;
    co2Saved: number;
  };
}

export const calculateTimeRemaining = (availableUntil: Date): string => {
  const now = new Date();
  const diffMs = availableUntil.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 0) return 'Expired';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} left`;
  
  const hours = Math.floor(diffMins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} left`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} left`;
};

export const formatPickupWindow = (from: Date, until: Date): string => {
  const fromDate = formatDate(from);
  const fromTime = from.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const untilTime = until.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return `${fromDate}, ${fromTime} - ${untilTime}`;
};

export const getCategoryLabel = (category: FoodCategory): string => {
  const labels: Record<FoodCategory, string> = {
    prepared_meals: 'Prepared Meals',
    fruits_vegetables: 'Fruits & Vegetables',
    bakery: 'Bakery Items',
    dairy: 'Dairy Products',
    meat: 'Meat & Protein',
    drinks: 'Beverages',
    other: 'Other Items'
  };
  
  return labels[category] || 'Other Items';
};

export const getStatusLabel = (status: DonationStatus): string => {
  const labels: Record<DonationStatus, string> = {
    available: 'Available',
    claimed: 'Claimed',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    canceled: 'Canceled'
  };
  
  return labels[status] || 'Unknown';
};

export const estimateMealCount = (quantity: number): number => {
  // Rough estimate: 1 meal = 0.5kg of food
  return Math.round(quantity * 2);
};

export const estimateCO2Savings = (quantity: number): number => {
  // Average CO2 emission for food waste is around 2.5kg CO2 per 1kg food
  return quantity * 2.5;
};

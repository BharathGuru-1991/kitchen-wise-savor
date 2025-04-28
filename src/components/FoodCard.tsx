
import React from 'react';
import { FoodItem } from '@/data/mockData';
import { formatDate } from '@/utils/dateUtils';
import ExpiryBadge from './ExpiryBadge';
import { Trash2 } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onDelete: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onDelete }) => {
  return (
    <div className="food-card p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {item.imageUrl ? (
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden bg-gray-100">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
            {item.name.charAt(0)}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <ExpiryBadge expiryDate={item.expiryDate} />
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>Quantity: {item.quantity} {item.unit}</span>
              <button 
                onClick={() => onDelete(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Delete item"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="text-xs mt-1 text-gray-500">
              <span>Purchased: {formatDate(item.purchaseDate)}</span>
              <span className="mx-2">•</span>
              <span>Expires: {formatDate(item.expiryDate)}</span>
            </div>
            {item.notes && (
              <p className="mt-1 italic text-xs">{item.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

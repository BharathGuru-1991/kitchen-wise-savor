
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <ShoppingCart size={48} className="text-primary" />
      </div>
      <h3 className="text-xl font-medium mb-2">Your inventory is empty</h3>
      <p className="text-gray-500 mb-4 max-w-sm">
        Start adding items to track their expiry dates and reduce food waste
      </p>
      <button
        onClick={onAddClick}
        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
      >
        Add your first item
      </button>
    </div>
  );
};

export default EmptyState;

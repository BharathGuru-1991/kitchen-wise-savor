
import React from 'react';
import FoodCard from './FoodCard';
import EmptyState from './EmptyState';
import { FoodItem } from '@/data/mockData';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface InventoryListProps {
  items: FoodItem[];
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onDelete, onAddClick }) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Your inventory is empty"
        description="Start adding items to track their expiry dates and reduce food waste"
        action={{
          label: "Add your first item",
          onClick: onAddClick
        }}
      />
    );
  }
  
  const itemsByCategory = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, FoodItem[]>);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Items ({items.length})</h3>
        <Button onClick={onAddClick} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
        <div key={category} className="mb-8">
          <h4 className="font-medium text-gray-700 mb-3 capitalize">{category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryItems.map(item => (
              <FoodCard key={item.id} item={item} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;

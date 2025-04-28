
import React, { useState } from 'react';
import { FoodItem } from '@/data/mockData';
import FoodCard from './FoodCard';
import EmptyState from './EmptyState';
import { Search, Filter, PlusCircle } from 'lucide-react';

interface InventoryListProps {
  items: FoodItem[];
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

type SortOption = 'expiry-asc' | 'expiry-desc' | 'name-asc' | 'name-desc';

const InventoryList: React.FC<InventoryListProps> = ({ 
  items, 
  onDelete,
  onAddClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('expiry-asc');
  
  const uniqueCategories = ['All', ...new Set(items.map(item => item.category))];
  
  // Filter items based on search term and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'expiry-asc':
        return a.expiryDate.getTime() - b.expiryDate.getTime();
      case 'expiry-desc':
        return b.expiryDate.getTime() - a.expiryDate.getTime();
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  // If there are no items, show empty state
  if (items.length === 0) {
    return <EmptyState onAddClick={onAddClick} />;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search box */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="pl-10 w-full p-2 border rounded-md"
          />
        </div>
        
        {/* Category filter */}
        <div className="flex gap-2 items-center">
          <Filter size={18} className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Sort options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="p-2 border rounded-md"
          >
            <option value="expiry-asc">Expires Soon</option>
            <option value="expiry-desc">Expires Later</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>

        {/* Add item button (for mobile it will be at the bottom) */}
        <button
          onClick={onAddClick}
          className="hidden md:flex items-center gap-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle size={18} />
          <span>Add Item</span>
        </button>
      </div>
      
      {/* Summary */}
      <p className="text-sm text-gray-500">
        {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'} found
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </p>
      
      {/* List of items */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {sortedItems.map(item => (
          <FoodCard key={item.id} item={item} onDelete={onDelete} />
        ))}
      </div>
      
      {/* Floating add button for mobile */}
      <button
        onClick={onAddClick}
        className="md:hidden fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <PlusCircle size={24} />
      </button>
    </div>
  );
};

export default InventoryList;

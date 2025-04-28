
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AddItemModal from '@/components/AddItemModal';
import InventoryList from '@/components/InventoryList';
import { FoodItem, mockFoodItems } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Load items from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('freshKeepInventory');
    if (savedItems) {
      try {
        // Convert date strings back to Date objects
        const parsedItems = JSON.parse(savedItems).map((item: any) => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate),
          expiryDate: new Date(item.expiryDate)
        }));
        setFoodItems(parsedItems);
      } catch (error) {
        console.error('Error parsing saved inventory', error);
        // Fallback to mock data
        setFoodItems(mockFoodItems);
      }
    } else {
      // No saved data, use mock data
      setFoodItems(mockFoodItems);
    }
  }, []);
  
  // Save to localStorage whenever items change
  useEffect(() => {
    if (foodItems.length > 0) {
      localStorage.setItem('freshKeepInventory', JSON.stringify(foodItems));
    }
  }, [foodItems]);
  
  // Check for expiring items and show notifications
  useEffect(() => {
    const expiringToday = foodItems.filter(item => 
      new Date(item.expiryDate).toDateString() === new Date().toDateString()
    );
    
    if (expiringToday.length > 0) {
      toast({
        title: "Items Expiring Today",
        description: `${expiringToday.length} item${expiringToday.length > 1 ? 's' : ''} in your inventory expire${expiringToday.length === 1 ? 's' : ''} today.`,
        variant: "warning"
      });
    }
  }, [foodItems, toast]);
  
  const handleAddItem = (newItem: Omit<FoodItem, 'id'>) => {
    const newId = Date.now().toString();
    const itemToAdd = { id: newId, ...newItem };
    
    setFoodItems(prev => [...prev, itemToAdd]);
    
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to your inventory.`,
    });
  };
  
  const handleDeleteItem = (id: string) => {
    const itemToDelete = foodItems.find(item => item.id === id);
    setFoodItems(prev => prev.filter(item => item.id !== id));
    
    if (itemToDelete) {
      toast({
        title: "Item Removed",
        description: `${itemToDelete.name} has been removed from your inventory.`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Inventory</h2>
        <p className="text-gray-600">
          Keep track of your food items and never waste food again
        </p>
      </div>
      
      <InventoryList 
        items={foodItems} 
        onDelete={handleDeleteItem}
        onAddClick={() => setIsModalOpen(true)}
      />
      
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddItem={handleAddItem} 
      />
    </Layout>
  );
};

export default Index;

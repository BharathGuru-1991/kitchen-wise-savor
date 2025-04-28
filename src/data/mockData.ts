
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  purchaseDate: Date;
  expiryDate: Date;
  quantity: number;
  unit: string;
  notes?: string;
  imageUrl?: string;
}

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'Dairy',
    purchaseDate: new Date('2025-04-24'),
    expiryDate: new Date('2025-05-01'),
    quantity: 1,
    unit: 'gallon',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '2',
    name: 'Spinach',
    category: 'Vegetables',
    purchaseDate: new Date('2025-04-25'),
    expiryDate: new Date('2025-04-29'),
    quantity: 1,
    unit: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '3',
    name: 'Chicken Breast',
    category: 'Meat',
    purchaseDate: new Date('2025-04-24'),
    expiryDate: new Date('2025-05-03'),
    quantity: 2,
    unit: 'lbs',
    notes: 'Free-range',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '4',
    name: 'Tomatoes',
    category: 'Vegetables',
    purchaseDate: new Date('2025-04-23'),
    expiryDate: new Date('2025-04-27'),
    quantity: 5,
    unit: 'pcs',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '5',
    name: 'Cheddar Cheese',
    category: 'Dairy',
    purchaseDate: new Date('2025-04-22'),
    expiryDate: new Date('2025-05-15'),
    quantity: 0.5,
    unit: 'lb',
    imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=100&h=100&q=80'
  },
];

export const foodCategories = [
  'Fruits',
  'Vegetables',
  'Dairy', 
  'Meat',
  'Seafood',
  'Bakery',
  'Pantry',
  'Frozen',
  'Beverages',
  'Snacks',
  'Other'
];

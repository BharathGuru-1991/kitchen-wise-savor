
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import DonationsList from '@/components/DonationsList';
import DonationForm from '@/components/DonationForm';
import { FoodDonation } from '@/utils/donationUtils';

// Mock data for our example
const mockDonations: FoodDonation[] = [
  {
    id: '1',
    title: 'Wedding Reception Surplus',
    description: 'Assorted canapés, finger sandwiches, and dessert platters from a wedding reception. All items professionally prepared and stored properly.',
    quantity: {
      value: 15,
      unit: 'kg'
    },
    category: 'prepared_meals',
    location: {
      address: '123 Grand Avenue, Cityville',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    temperature: 4,
    availableFrom: new Date(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    status: 'available',
    donorId: 'hotel1',
    createdAt: new Date(),
    updatedAt: new Date(),
    packagingInfo: 'In sealed catering trays',
    allergens: ['dairy', 'gluten', 'nuts'],
    dietaryInfo: ['contains meat', 'contains seafood'],
    safetyChecklist: {
      properlyStored: true,
      temperatureControlled: true,
      contaminationFree: true,
      freshlyPrepared: true
    },
    images: ['https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60']
  },
  {
    id: '2',
    title: 'Corporate Lunch Leftovers',
    description: 'Mediterranean lunch boxes with falafel, hummus, salad and pita bread. Enough for approximately 20 people.',
    quantity: {
      value: 8,
      unit: 'boxes'
    },
    category: 'prepared_meals',
    location: {
      address: '555 Business Park, Downtown',
      coordinates: {
        latitude: 37.7833,
        longitude: -122.4167
      }
    },
    temperature: null,
    availableFrom: new Date(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    status: 'available',
    donorId: 'corp1',
    createdAt: new Date(),
    updatedAt: new Date(),
    packagingInfo: 'Individual compostable containers',
    allergens: ['sesame'],
    dietaryInfo: ['vegetarian options available'],
    safetyChecklist: {
      properlyStored: true,
      temperatureControlled: false,
      contaminationFree: true,
      freshlyPrepared: true
    },
    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60']
  },
  {
    id: '3',
    title: 'Fresh Bread and Pastries',
    description: 'End-of-day bakery items including sourdough bread, croissants, and muffins. Still fresh and delicious!',
    quantity: {
      value: 5,
      unit: 'kg'
    },
    category: 'bakery',
    location: {
      address: '789 Main Street, Bakersville',
      coordinates: {
        latitude: 37.7695,
        longitude: -122.4285
      }
    },
    temperature: null,
    availableFrom: new Date(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    status: 'available',
    donorId: 'bakery1',
    createdAt: new Date(),
    updatedAt: new Date(),
    allergens: ['gluten', 'dairy', 'eggs'],
    safetyChecklist: {
      properlyStored: true,
      temperatureControlled: false,
      contaminationFree: true,
      freshlyPrepared: true
    },
    images: ['https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60']
  },
  {
    id: '4',
    title: 'Fresh Fruits and Vegetables',
    description: 'Assortment of fruits and vegetables from our local grocery. Slightly blemished but perfectly edible.',
    quantity: {
      value: 10,
      unit: 'kg'
    },
    category: 'fruits_vegetables',
    location: {
      address: '456 Market St, Cityville',
      coordinates: {
        latitude: 37.7739,
        longitude: -122.4312
      }
    },
    temperature: null,
    availableFrom: new Date(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
    status: 'available',
    donorId: 'grocery1',
    createdAt: new Date(),
    updatedAt: new Date(),
    safetyChecklist: {
      properlyStored: true,
      temperatureControlled: true,
      contaminationFree: true,
      freshlyPrepared: false
    },
    images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60']
  }
];

const DonationDashboard = () => {
  const [donations, setDonations] = useState<FoodDonation[]>(mockDonations);
  const [filteredDonations, setFilteredDonations] = useState<FoodDonation[]>(mockDonations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('available');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredDonations(donations.filter(d => 
        currentTab === 'all' || d.status === currentTab
      ));
      return;
    }
    
    const filtered = donations.filter(donation => {
      const matchesQuery = 
        donation.title.toLowerCase().includes(query) ||
        donation.description.toLowerCase().includes(query) ||
        donation.location.address.toLowerCase().includes(query);
      
      const matchesTab = currentTab === 'all' || donation.status === currentTab;
      
      return matchesQuery && matchesTab;
    });
    
    setFilteredDonations(filtered);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    
    if (value === 'all') {
      setFilteredDonations(
        searchQuery 
          ? donations.filter(d => 
              d.title.toLowerCase().includes(searchQuery) || 
              d.description.toLowerCase().includes(searchQuery) ||
              d.location.address.toLowerCase().includes(searchQuery)
            )
          : donations
      );
    } else {
      setFilteredDonations(
        donations.filter(d => {
          const matchesStatus = d.status === value;
          const matchesQuery = !searchQuery || 
            d.title.toLowerCase().includes(searchQuery) || 
            d.description.toLowerCase().includes(searchQuery) ||
            d.location.address.toLowerCase().includes(searchQuery);
          
          return matchesStatus && matchesQuery;
        })
      );
    }
  };

  const handleClaimDonation = (donationId: string) => {
    // In a real app, this would call an API
    const updatedDonations = donations.map(donation => {
      if (donation.id === donationId) {
        return {
          ...donation,
          status: 'claimed' as const,
          claimedBy: 'current-user-id',
          updatedAt: new Date()
        };
      }
      return donation;
    });
    
    setDonations(updatedDonations);
    handleTabChange(currentTab); // Refresh the filtered list
  };

  const handleCreateDonation = (newDonation: FoodDonation) => {
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    setIsFormOpen(false);
    handleTabChange('available'); // Switch to available tab
  };

  const handleViewDonationDetails = (donationId: string) => {
    console.log(`View details for donation ${donationId}`);
    // In a real app, this would navigate to a detailed view or open a modal
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Rescue Connect</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Donation
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search donations by title, description or location..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="available" value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="claimed">Claimed</TabsTrigger>
          <TabsTrigger value="in_transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="all">All Donations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-0">
          <DonationsList
            donations={filteredDonations.filter(d => d.status === 'available')}
            isLoading={isLoading}
            onClaimDonation={handleClaimDonation}
            onViewDonationDetails={handleViewDonationDetails}
          />
        </TabsContent>
        
        <TabsContent value="claimed" className="mt-0">
          <DonationsList
            donations={filteredDonations.filter(d => d.status === 'claimed')}
            isLoading={isLoading}
            onClaimDonation={handleClaimDonation}
            onViewDonationDetails={handleViewDonationDetails}
          />
        </TabsContent>
        
        <TabsContent value="in_transit" className="mt-0">
          <DonationsList
            donations={filteredDonations.filter(d => d.status === 'in_transit')}
            isLoading={isLoading}
            onClaimDonation={handleClaimDonation}
            onViewDonationDetails={handleViewDonationDetails}
          />
        </TabsContent>
        
        <TabsContent value="delivered" className="mt-0">
          <DonationsList
            donations={filteredDonations.filter(d => d.status === 'delivered')}
            isLoading={isLoading}
            onClaimDonation={handleClaimDonation}
            onViewDonationDetails={handleViewDonationDetails}
          />
        </TabsContent>
        
        <TabsContent value="all" className="mt-0">
          <DonationsList
            donations={filteredDonations}
            isLoading={isLoading}
            onClaimDonation={handleClaimDonation}
            onViewDonationDetails={handleViewDonationDetails}
          />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>List New Food Donation</DialogTitle>
          </DialogHeader>
          <DonationForm 
            onSubmit={handleCreateDonation} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationDashboard;


import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import DonationCard from '@/components/DonationCard';
import { FoodDonation } from '@/utils/donationUtils';
import EmptyState from '@/components/EmptyState';

interface DonationsListProps {
  donations: FoodDonation[];
  isLoading: boolean;
  onClaimDonation: (donationId: string) => void;
  onViewDonationDetails: (donationId: string) => void;
}

const DonationsList = ({ 
  donations, 
  isLoading, 
  onClaimDonation, 
  onViewDonationDetails 
}: DonationsListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-72 bg-muted rounded-md"></div>
        ))}
      </div>
    );
  }

  if (!donations.length) {
    return (
      <EmptyState
        title="No Food Donations Available"
        description="There are currently no food donations available. Please check back later or create a new donation."
        action={{
          label: "Add New Donation",
          onClick: () => console.log("New donation action"),
        }}
        className="py-12"
      />
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
        {donations.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            onClaim={onClaimDonation}
            onViewDetails={onViewDonationDetails}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default DonationsList;


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Info, ShoppingBag, AlertCircle } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { FoodDonation, calculateTimeRemaining, getCategoryLabel } from '@/utils/donationUtils';
import { formatDate } from '@/utils/dateUtils';

interface DonationCardProps {
  donation: FoodDonation;
  onClaim: (donationId: string) => void;
  onViewDetails: (donationId: string) => void;
}

const DonationCard = ({ donation, onClaim, onViewDetails }: DonationCardProps) => {
  const timeRemaining = calculateTimeRemaining(donation.availableUntil);
  const isUrgent = donation.availableUntil.getTime() - new Date().getTime() < 1000 * 60 * 60 * 3; // 3 hours
  
  const renderSafetyInfo = () => {
    if (!donation.safetyChecklist) return null;
    
    const { properlyStored, temperatureControlled, contaminationFree, freshlyPrepared } = donation.safetyChecklist;
    const allChecked = properlyStored && temperatureControlled && contaminationFree && freshlyPrepared;
    
    return (
      <div className="flex items-center gap-1">
        <AlertCircle size={16} className={allChecked ? "text-green-500" : "text-amber-500"} />
        <span className="text-xs">
          {allChecked ? "All safety checks passed" : "Some safety checks missing"}
        </span>
      </div>
    );
  };
  
  return (
    <Card className="overflow-hidden">
      {donation.images && donation.images.length > 0 && (
        <div className="relative h-48 w-full">
          <img 
            src={donation.images[0]} 
            alt={donation.title} 
            className="absolute inset-0 h-full w-full object-cover" 
          />
          <Badge 
            className={`absolute top-2 right-2 ${isUrgent ? 'bg-red-500' : ''}`}
            variant={isUrgent ? "destructive" : "secondary"}
          >
            {timeRemaining}
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{donation.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin size={14} className="mr-1" />
              {donation.location.address.split(',')[0]}
            </CardDescription>
          </div>
          <Badge variant="outline">
            {getCategoryLabel(donation.category)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{donation.description}</p>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <ShoppingBag size={16} />
            <span>{donation.quantity.value} {donation.quantity.unit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Until {formatDate(donation.availableUntil)}</span>
          </div>
        </div>
        
        {renderSafetyInfo()}
        
        {donation.allergens && donation.allergens.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
                <Info size={16} className="text-amber-500" />
                <span className="text-xs">Contains allergens</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <p className="text-sm font-medium">Allergens:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {donation.allergens.map(allergen => (
                  <Badge key={allergen} variant="outline" className="text-xs">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(donation.id)}>
          View Details
        </Button>
        {donation.status === 'available' && (
          <Button onClick={() => onClaim(donation.id)}>
            Claim Food
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DonationCard;

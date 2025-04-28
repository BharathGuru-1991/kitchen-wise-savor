
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FoodCategory } from '@/utils/donationUtils';
import { toast } from '@/components/ui/sonner';
import { CheckCircle2 } from 'lucide-react';

interface DonationFormProps {
  onSubmit: (donationData: any) => void;
  onCancel: () => void;
}

const DonationForm = ({ onSubmit, onCancel }: DonationFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: {
      value: 1,
      unit: 'kg'
    },
    category: 'prepared_meals' as FoodCategory,
    location: {
      address: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    },
    temperature: null as number | null,
    availableFrom: new Date(),
    availableUntil: new Date(Date.now() + 3600000 * 5), // 5 hours from now
    packagingInfo: '',
    allergens: [] as string[],
    dietaryInfo: [] as string[],
    safetyChecklist: {
      properlyStored: false,
      temperatureControlled: false,
      contaminationFree: false,
      freshlyPrepared: false
    }
  });

  const [allergenInput, setAllergenInput] = useState('');
  const [dietaryInput, setDietaryInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      quantity: {
        ...prev.quantity,
        [name]: name === 'value' ? Number(value) : value
      }
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value as FoodCategory
    }));
  };

  const handleSafetyCheckChange = (check: keyof typeof formData.safetyChecklist) => {
    setFormData(prev => ({
      ...prev,
      safetyChecklist: {
        ...prev.safetyChecklist,
        [check]: !prev.safetyChecklist[check]
      }
    }));
  };

  const addAllergen = () => {
    if (allergenInput.trim() && !formData.allergens.includes(allergenInput.trim())) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, allergenInput.trim()]
      }));
      setAllergenInput('');
    }
  };

  const removeAllergen = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter(a => a !== allergen)
    }));
  };

  const addDietaryInfo = () => {
    if (dietaryInput.trim() && !formData.dietaryInfo.includes(dietaryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        dietaryInfo: [...prev.dietaryInfo, dietaryInput.trim()]
      }));
      setDietaryInput('');
    }
  };

  const removeDietaryInfo = (info: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryInfo: prev.dietaryInfo.filter(i => i !== info)
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Here we would normally send the data to an API
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit({
        ...formData,
        id: `donation-${Date.now()}`,
        status: 'available',
        donorId: 'current-user-id',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      toast.success("Donation listed successfully!", {
        description: "Food banks in your area will be notified."
      });
    } catch (error) {
      toast.error("Failed to list donation", {
        description: "Please try again later."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Food Donation Details</h3>
        
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Catered sandwiches from conference"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the food, how it was stored, etc."
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity.value">Quantity</Label>
              <div className="flex">
                <Input
                  id="quantity.value"
                  name="value"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={formData.quantity.value}
                  onChange={handleQuantityChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="quantity.unit">Unit</Label>
              <Input
                id="quantity.unit"
                name="unit"
                value={formData.quantity.unit}
                onChange={handleQuantityChange}
                placeholder="kg, lbs, trays, etc."
                required
              />
            </div>
          </div>
          
          <div>
            <Label>Category</Label>
            <RadioGroup 
              value={formData.category}
              onValueChange={handleCategoryChange}
              className="grid grid-cols-2 gap-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prepared_meals" id="prepared_meals" />
                <Label htmlFor="prepared_meals">Prepared Meals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fruits_vegetables" id="fruits_vegetables" />
                <Label htmlFor="fruits_vegetables">Fruits & Vegetables</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bakery" id="bakery" />
                <Label htmlFor="bakery">Bakery Items</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dairy" id="dairy" />
                <Label htmlFor="dairy">Dairy Products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="meat" id="meat" />
                <Label htmlFor="meat">Meat & Protein</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="drinks" id="drinks" />
                <Label htmlFor="drinks">Beverages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other Items</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div>
          <Label htmlFor="location.address">Pickup Location</Label>
          <Input
            id="location.address"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder="Full address for pickup"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="availableFrom">Available From</Label>
            <Input
              id="availableFrom"
              name="availableFrom"
              type="datetime-local"
              value={formData.availableFrom.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="availableUntil">Available Until</Label>
            <Input
              id="availableUntil"
              name="availableUntil"
              type="datetime-local"
              value={formData.availableUntil.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              required
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Food Safety Checklist</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="properlyStored"
                checked={formData.safetyChecklist.properlyStored}
                onChange={() => handleSafetyCheckChange('properlyStored')}
                className="rounded border-gray-300 mr-2"
              />
              <Label htmlFor="properlyStored">Food has been properly stored</Label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="temperatureControlled"
                checked={formData.safetyChecklist.temperatureControlled}
                onChange={() => handleSafetyCheckChange('temperatureControlled')}
                className="rounded border-gray-300 mr-2"
              />
              <Label htmlFor="temperatureControlled">Temperature controlled as needed</Label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contaminationFree"
                checked={formData.safetyChecklist.contaminationFree}
                onChange={() => handleSafetyCheckChange('contaminationFree')}
                className="rounded border-gray-300 mr-2"
              />
              <Label htmlFor="contaminationFree">Free from contamination</Label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="freshlyPrepared"
                checked={formData.safetyChecklist.freshlyPrepared}
                onChange={() => handleSafetyCheckChange('freshlyPrepared')}
                className="rounded border-gray-300 mr-2"
              />
              <Label htmlFor="freshlyPrepared">Freshly prepared (within 24 hours)</Label>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="allergen-input">Allergens</Label>
          <div className="flex gap-2">
            <Input
              id="allergen-input"
              value={allergenInput}
              onChange={(e) => setAllergenInput(e.target.value)}
              placeholder="e.g., nuts, dairy, gluten"
            />
            <Button type="button" variant="outline" onClick={addAllergen}>Add</Button>
          </div>
          {formData.allergens.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.allergens.map(allergen => (
                <Badge 
                  key={allergen} 
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => removeAllergen(allergen)}
                >
                  {allergen} &times;
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="dietary-input">Dietary Information</Label>
          <div className="flex gap-2">
            <Input
              id="dietary-input"
              value={dietaryInput}
              onChange={(e) => setDietaryInput(e.target.value)}
              placeholder="e.g., vegetarian, vegan, halal"
            />
            <Button type="button" variant="outline" onClick={addDietaryInfo}>Add</Button>
          </div>
          {formData.dietaryInfo.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.dietaryInfo.map(info => (
                <Badge 
                  key={info} 
                  variant="outline"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => removeDietaryInfo(info)}
                >
                  {info} &times;
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'List Food Donation'}
        </Button>
      </div>
    </form>
  );
};

export default DonationForm;

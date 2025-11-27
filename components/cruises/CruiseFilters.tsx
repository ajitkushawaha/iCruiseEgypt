'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface CruiseFiltersProps {
    onFilterChange: (filters: {
        minPrice: number;
        maxPrice: number;
        duration: string;
        destination: string;
    }) => void;
}

export function CruiseFilters({ onFilterChange }: CruiseFiltersProps) {
    const [priceRange, setPriceRange] = useState([2000]);
    const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

    const handleApplyFilters = () => {
        onFilterChange({
            minPrice: 0,
            maxPrice: priceRange[0],
            duration: selectedDurations.join('|'),
            destination: selectedDestinations.join('|'),
        });
    };

    const handleDurationChange = (duration: string, checked: boolean) => {
        if (checked) {
            setSelectedDurations([...selectedDurations, duration]);
        } else {
            setSelectedDurations(selectedDurations.filter((d) => d !== duration));
        }
    };

    const handleDestinationChange = (destination: string, checked: boolean) => {
        if (checked) {
            setSelectedDestinations([...selectedDestinations, destination]);
        } else {
            setSelectedDestinations(selectedDestinations.filter((d) => d !== destination));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                    <Slider
                        defaultValue={[2000]}
                        max={5000}
                        min={200}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>$200</span>
                        <span>${priceRange[0]}+</span>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Duration</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="d-3"
                            onCheckedChange={(checked) => handleDurationChange('3', checked as boolean)}
                        />
                        <Label htmlFor="d-3" className="text-gray-700">3-4 Nights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="d-5"
                            onCheckedChange={(checked) => handleDurationChange('5', checked as boolean)}
                        />
                        <Label htmlFor="d-5" className="text-gray-700">5-6 Nights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="d-7"
                            onCheckedChange={(checked) => handleDurationChange('7', checked as boolean)}
                        />
                        <Label htmlFor="d-7" className="text-gray-700">7+ Nights</Label>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Destination</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="loc-luxor"
                            onCheckedChange={(checked) => handleDestinationChange('Luxor', checked as boolean)}
                        />
                        <Label htmlFor="loc-luxor" className="text-gray-700">Luxor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="loc-aswan"
                            onCheckedChange={(checked) => handleDestinationChange('Aswan', checked as boolean)}
                        />
                        <Label htmlFor="loc-aswan" className="text-gray-700">Aswan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="loc-cairo"
                            onCheckedChange={(checked) => handleDestinationChange('Cairo', checked as boolean)}
                        />
                        <Label htmlFor="loc-cairo" className="text-gray-700">Cairo</Label>
                    </div>
                </div>
            </div>

            <Button
                className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                onClick={handleApplyFilters}
            >
                Apply Filters
            </Button>
        </div>
    );
}

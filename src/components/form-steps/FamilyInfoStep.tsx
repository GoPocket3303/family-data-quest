
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '../MultiStepForm';

interface FamilyInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const FamilyInfoStep: React.FC<FamilyInfoStepProps> = ({ data, updateData }) => {
  const handleChildrenChange = (hasChildren: boolean) => {
    updateData({ 
      hasChildren, 
      childrenCount: hasChildren ? 1 : 0,
      children: hasChildren ? [{ name: '', age: '', gender: '' }] : []
    });
  };

  const handleChildrenCountChange = (count: number) => {
    const newChildren = Array.from({ length: count }, (_, i) => 
      data.children[i] || { name: '', age: '', gender: '' }
    );
    updateData({ childrenCount: count, children: newChildren });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Do you have children?</Label>
        <RadioGroup
          value={data.hasChildren ? 'yes' : 'no'}
          onValueChange={(value) => handleChildrenChange(value === 'yes')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {data.hasChildren && (
        <div className="space-y-4">
          <Label className="text-lg font-semibold">How many children do you have?</Label>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                variant={data.childrenCount === num ? 'default' : 'outline'}
                onClick={() => handleChildrenCountChange(num)}
                className="w-12 h-12"
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInfoStep;

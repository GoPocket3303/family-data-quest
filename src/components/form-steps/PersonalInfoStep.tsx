
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '../MultiStepForm';

interface PersonalInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Enter your full name"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            placeholder="Enter your age"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="wifeName">Wife's Name</Label>
        <Input
          id="wifeName"
          value={data.wifeName}
          onChange={(e) => updateData({ wifeName: e.target.value })}
          placeholder="Enter your wife's name"
          className="focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;

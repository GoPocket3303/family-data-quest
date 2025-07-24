
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '../MultiStepForm';

interface ChildrenInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ChildrenInfoStep: React.FC<ChildrenInfoStepProps> = ({ data, updateData }) => {
  const updateChildData = (index: number, field: string, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateData({ children: newChildren });
  };

  if (!data.hasChildren) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No children information needed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Children Details</h3>
      
      {data.children.map((child, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium mb-4">Child {index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`child-name-${index}`}>Name *</Label>
              <Input
                id={`child-name-${index}`}
                value={child.name}
                onChange={(e) => updateChildData(index, 'name', e.target.value)}
                placeholder="Enter child's name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`child-age-${index}`}>Age *</Label>
              <Input
                id={`child-age-${index}`}
                type="number"
                value={child.age}
                onChange={(e) => updateChildData(index, 'age', e.target.value)}
                placeholder="Enter child's age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`child-gender-${index}`}>Gender *</Label>
              <Select
                value={child.gender}
                onValueChange={(value) => updateChildData(index, 'gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildrenInfoStep;


import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface GenerationInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const GenerationInfoStep: React.FC<GenerationInfoStepProps> = ({ data, updateData }) => {
  const addAdditionalGeneration = () => {
    const newGeneration = [...data.additionalGeneration, { name: '', relation: '' }];
    updateData({ additionalGeneration: newGeneration });
  };

  const removeAdditionalGeneration = (index: number) => {
    const newGeneration = data.additionalGeneration.filter((_, i) => i !== index);
    updateData({ additionalGeneration: newGeneration });
  };

  const updateGenerationData = (index: number, field: string, value: string) => {
    const newGeneration = [...data.additionalGeneration];
    newGeneration[index] = { ...newGeneration[index], [field]: value };
    updateData({ additionalGeneration: newGeneration });
  };

  const addGreatGrandMother = () => {
    const newGreatGrandMothers = [...data.greatGrandMothers, { name: '' }];
    updateData({ greatGrandMothers: newGreatGrandMothers });
  };

  const removeGreatGrandMother = (index: number) => {
    const newGreatGrandMothers = data.greatGrandMothers.filter((_, i) => i !== index);
    updateData({ greatGrandMothers: newGreatGrandMothers });
  };

  const updateGreatGrandMotherData = (index: number, field: string, value: string) => {
    const newGreatGrandMothers = [...data.greatGrandMothers];
    newGreatGrandMothers[index] = { ...newGreatGrandMothers[index], [field]: value };
    updateData({ greatGrandMothers: newGreatGrandMothers });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's Name *</Label>
          <Input
            id="fatherName"
            value={data.fatherName}
            onChange={(e) => updateData({ fatherName: e.target.value })}
            placeholder="Enter father's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="motherName">Mother's Name *</Label>
          <Input
            id="motherName"
            value={data.motherName}
            onChange={(e) => updateData({ motherName: e.target.value })}
            placeholder="Enter mother's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="grandFatherName">Grandfather's Name</Label>
          <Input
            id="grandFatherName"
            value={data.grandFatherName}
            onChange={(e) => updateData({ grandFatherName: e.target.value })}
            placeholder="Enter grandfather's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="grandMotherName">Grandmother's Name</Label>
          <Input
            id="grandMotherName"
            value={data.grandMotherName}
            onChange={(e) => updateData({ grandMotherName: e.target.value })}
            placeholder="Enter grandmother's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="greatGrandFatherName">Great Grandfather's Name</Label>
          <Input
            id="greatGrandFatherName"
            value={data.greatGrandFatherName}
            onChange={(e) => updateData({ greatGrandFatherName: e.target.value })}
            placeholder="Enter great grandfather's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="greatGrandMotherName">Great Grandmother's Name</Label>
          <Input
            id="greatGrandMotherName"
            value={data.greatGrandMotherName}
            onChange={(e) => updateData({ greatGrandMotherName: e.target.value })}
            placeholder="Enter great grandmother's name"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Additional Great Grandmothers</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addGreatGrandMother}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Great Grandmother
          </Button>
        </div>

        {data.greatGrandMothers.map((greatGrandMother, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Great Grandmother {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeGreatGrandMother(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`greatgrandmother-name-${index}`}>Name</Label>
              <Input
                id={`greatgrandmother-name-${index}`}
                value={greatGrandMother.name}
                onChange={(e) => updateGreatGrandMotherData(index, 'name', e.target.value)}
                placeholder="Enter great grandmother's name"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasAdditionalGeneration"
            checked={data.hasAdditionalGeneration}
            onCheckedChange={(checked) => updateData({ hasAdditionalGeneration: checked as boolean })}
          />
          <Label htmlFor="hasAdditionalGeneration">
            I know about previous generations
          </Label>
        </div>

        {data.hasAdditionalGeneration && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Additional Generation Details</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAdditionalGeneration}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Person
              </Button>
            </div>

            {data.additionalGeneration.map((person, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Person {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdditionalGeneration(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`person-name-${index}`}>Name</Label>
                    <Input
                      id={`person-name-${index}`}
                      value={person.name}
                      onChange={(e) => updateGenerationData(index, 'name', e.target.value)}
                      placeholder="Enter person's name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`person-relation-${index}`}>Relation</Label>
                    <Input
                      id={`person-relation-${index}`}
                      value={person.relation}
                      onChange={(e) => updateGenerationData(index, 'relation', e.target.value)}
                      placeholder="e.g., Great Great Grandfather, Great Great Grandmother"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerationInfoStep;

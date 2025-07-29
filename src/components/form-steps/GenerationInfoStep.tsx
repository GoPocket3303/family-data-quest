
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

  const getGenerationOrdinal = (index: number) => {
    const ordinals = ['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return ordinals[index] || `${index + 2}th`;
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
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium mb-4">Generation 1 / தலைமுறை 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="greatGrandFatherName">Great Grandfather's Name / மூத்த தாத்தாவின் பெயர்</Label>
              <Input
                id="greatGrandFatherName"
                value={data.greatGrandFatherName}
                onChange={(e) => updateData({ greatGrandFatherName: e.target.value })}
                placeholder="Enter great grandfather's name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="greatGrandMotherName">Great Grandmother's Name / மூத்த பாட்டியின் பெயர்</Label>
              <Input
                id="greatGrandMotherName"
                value={data.greatGrandMotherName}
                onChange={(e) => updateData({ greatGrandMotherName: e.target.value })}
                placeholder="Enter great grandmother's name"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasAdditionalGeneration"
            checked={data.hasAdditionalGeneration}
            onCheckedChange={(checked) => updateData({ hasAdditionalGeneration: checked as boolean })}
          />
          <Label htmlFor="hasAdditionalGeneration">
            I know about additional generations / கூடுதல் தலைமுறை விவரங்கள் தெரியும்
          </Label>
        </div>

        {data.hasAdditionalGeneration && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Additional Generation Details / கூடுதல் தலைமுறை விவரங்கள்</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAdditionalGeneration}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Generation / தலைமுறை சேர்க்கவும்
              </Button>
            </div>

            {data.additionalGeneration.map((generation, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Generation {index + 2} / தலைமுறை {index + 2}</h4>
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
                    <Label htmlFor={`additional-great-grandfather-${index}`}>
                      {getGenerationOrdinal(index)} Great Grandfather's Name / {getGenerationOrdinal(index)} மூத்த தாத்தாவின் பெயர்
                    </Label>
                    <Input
                      id={`additional-great-grandfather-${index}`}
                      value={generation.name}
                      onChange={(e) => updateGenerationData(index, 'name', e.target.value)}
                      placeholder={`Enter ${getGenerationOrdinal(index).toLowerCase()} great grandfather's name`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`additional-great-grandmother-${index}`}>
                      {getGenerationOrdinal(index)} Great Grandmother's Name / {getGenerationOrdinal(index)} மூத்த பாட்டியின் பெயர்
                    </Label>
                    <Input
                      id={`additional-great-grandmother-${index}`}
                      value={generation.relation}
                      onChange={(e) => updateGenerationData(index, 'relation', e.target.value)}
                      placeholder={`Enter ${getGenerationOrdinal(index).toLowerCase()} great grandmother's name`}
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

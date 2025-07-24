
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Baby, TreePine } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface PersonalFamilyStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const PersonalFamilyStep: React.FC<PersonalFamilyStepProps> = ({ data, updateData }) => {
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

  const updateChildData = (index: number, field: string, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateData({ children: newChildren });
  };

  const updateAdditionalGeneration = (index: number, field: string, value: string) => {
    const newGeneration = [...data.additionalGeneration];
    newGeneration[index] = { ...newGeneration[index], [field]: value };
    updateData({ additionalGeneration: newGeneration });
  };

  const addAdditionalGeneration = () => {
    updateData({
      additionalGeneration: [...data.additionalGeneration, { name: '', relation: '' }]
    });
  };

  const removeAdditionalGeneration = (index: number) => {
    const newGeneration = data.additionalGeneration.filter((_, i) => i !== index);
    updateData({ additionalGeneration: newGeneration });
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-6 h-6 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                placeholder="Enter your full name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">Age *</Label>
              <Input
                id="age"
                type="number"
                value={data.age}
                onChange={(e) => updateData({ age: e.target.value })}
                placeholder="Enter your age"
                className="h-12"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wifeName" className="text-sm font-medium">Wife's Name</Label>
            <Input
              id="wifeName"
              value={data.wifeName}
              onChange={(e) => updateData({ wifeName: e.target.value })}
              placeholder="Enter your wife's name"
              className="h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Family Information */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6 text-purple-600" />
            Family Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <Button
                    key={num}
                    variant={data.childrenCount === num ? 'default' : 'outline'}
                    onClick={() => handleChildrenCountChange(num)}
                    className="h-12 w-12"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Children Details */}
      {data.hasChildren && data.children.length > 0 && (
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Baby className="w-6 h-6 text-green-600" />
              Children Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.children.map((child, index) => (
              <div key={index} className="p-6 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-4 text-lg">Child {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`child-name-${index}`}>Name *</Label>
                    <Input
                      id={`child-name-${index}`}
                      value={child.name}
                      onChange={(e) => updateChildData(index, 'name', e.target.value)}
                      placeholder="Enter child's name"
                      className="h-12"
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
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`child-gender-${index}`}>Gender *</Label>
                    <Select
                      value={child.gender}
                      onValueChange={(value) => updateChildData(index, 'gender', value)}
                    >
                      <SelectTrigger className="h-12">
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
          </CardContent>
        </Card>
      )}

      {/* Generation Information */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TreePine className="w-6 h-6 text-orange-600" />
            Family Tree
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name *</Label>
              <Input
                id="fatherName"
                value={data.fatherName}
                onChange={(e) => updateData({ fatherName: e.target.value })}
                placeholder="Enter father's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name *</Label>
              <Input
                id="motherName"
                value={data.motherName}
                onChange={(e) => updateData({ motherName: e.target.value })}
                placeholder="Enter mother's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grandFatherName">Grandfather's Name</Label>
              <Input
                id="grandFatherName"
                value={data.grandFatherName}
                onChange={(e) => updateData({ grandFatherName: e.target.value })}
                placeholder="Enter grandfather's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grandMotherName">Grandmother's Name</Label>
              <Input
                id="grandMotherName"
                value={data.grandMotherName}
                onChange={(e) => updateData({ grandMotherName: e.target.value })}
                placeholder="Enter grandmother's name"
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasAdditionalGeneration"
                checked={data.hasAdditionalGeneration}
                onChange={(e) => updateData({ hasAdditionalGeneration: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="hasAdditionalGeneration">Add additional generation details</Label>
            </div>

            {data.hasAdditionalGeneration && (
              <div className="space-y-4">
                {data.additionalGeneration.map((gen, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`gen-name-${index}`}>Name</Label>
                        <Input
                          id={`gen-name-${index}`}
                          value={gen.name}
                          onChange={(e) => updateAdditionalGeneration(index, 'name', e.target.value)}
                          placeholder="Enter name"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`gen-relation-${index}`}>Relation</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`gen-relation-${index}`}
                            value={gen.relation}
                            onChange={(e) => updateAdditionalGeneration(index, 'relation', e.target.value)}
                            placeholder="e.g., Great Grandfather"
                            className="h-12"
                          />
                          <Button
                            variant="outline"
                            onClick={() => removeAdditionalGeneration(index)}
                            className="h-12 px-3"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addAdditionalGeneration}
                  className="w-full"
                >
                  Add Another Generation
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalFamilyStep;

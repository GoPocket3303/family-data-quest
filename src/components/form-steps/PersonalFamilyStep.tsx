import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Baby, TreePine, Plus, X } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface PersonalFamilyStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const PersonalFamilyStep: React.FC<PersonalFamilyStepProps> = ({ data, updateData }) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const handleChildrenChange = (hasChildren: boolean) => {
    updateData({ 
      hasChildren, 
      childrenCount: hasChildren ? 1 : 0,
      children: hasChildren ? [{ name: '', age: '', gender: '', bloodGroup: '', status: '', courseDetails: '', workDetails: '' }] : []
    });
  };

  const handleChildrenCountChange = (count: number) => {
    const newChildren = Array.from({ length: count }, (_, i) => 
      data.children[i] || { name: '', age: '', gender: '', bloodGroup: '', status: '', courseDetails: '', workDetails: '' }
    );
    updateData({ childrenCount: count, children: newChildren });
  };

  const updateChildData = (index: number, field: string, value: string) => {
    const newChildren = [...data.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    updateData({ children: newChildren });
  };

  const updateWifeData = (index: number, field: string, value: string) => {
    const newWives = [...data.wives];
    newWives[index] = { ...newWives[index], [field]: value };
    updateData({ wives: newWives });
  };

  const addWife = () => {
    updateData({
      wives: [...data.wives, { name: '', bloodGroup: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '' }]
    });
  };

  const removeWife = (index: number) => {
    if (data.wives.length > 1) {
      const newWives = data.wives.filter((_, i) => i !== index);
      updateData({ wives: newWives });
    }
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

  const updateMotherData = (index: number, field: string, value: string) => {
    const newMothers = [...data.mothers];
    newMothers[index] = { ...newMothers[index], [field]: value };
    updateData({ mothers: newMothers });
  };

  const addMother = () => {
    updateData({
      mothers: [...data.mothers, { name: '', whatsapp: '' }]
    });
  };

  const removeMother = (index: number) => {
    const newMothers = data.mothers.filter((_, i) => i !== index);
    updateData({ mothers: newMothers });
  };

  const updateGrandMotherData = (index: number, field: string, value: string) => {
    const newGrandMothers = [...data.grandMothers];
    newGrandMothers[index] = { ...newGrandMothers[index], [field]: value };
    updateData({ grandMothers: newGrandMothers });
  };

  const addGrandMother = () => {
    updateData({
      grandMothers: [...data.grandMothers, { name: '' }]
    });
  };

  const removeGrandMother = (index: number) => {
    const newGrandMothers = data.grandMothers.filter((_, i) => i !== index);
    updateData({ grandMothers: newGrandMothers });
  };

  const getGenerationOrdinal = (index: number) => {
    const ordinals = ['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return ordinals[index] || `${index + 2}th`;
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-6 h-6 text-blue-600" />
            Personal Information / தனிப்பட்ட தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name / பெயர் *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                placeholder="Enter your full name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">Age / வயது *</Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup" className="text-sm font-medium">Blood Group / இரத்த வகை *</Label>
              <Select value={data.bloodGroup} onValueChange={(value) => updateData({ bloodGroup: value })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-sm font-medium">Profession / தொழில் *</Label>
              <Select value={data.profession} onValueChange={(value) => updateData({ profession: value })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business / வணிகம்</SelectItem>
                  <SelectItem value="salaried">Salaried / சம்பளம்</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {data.profession === 'business' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessDescription" className="text-sm font-medium">Business Description / வணிக விவரம் *</Label>
                <Input
                  id="businessDescription"
                  value={data.businessDescription}
                  onChange={(e) => updateData({ businessDescription: e.target.value })}
                  placeholder="Enter business description"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress" className="text-sm font-medium">Business Address / வணிக முகவரி *</Label>
                <Input
                  id="businessAddress"
                  value={data.businessAddress}
                  onChange={(e) => updateData({ businessAddress: e.target.value })}
                  placeholder="Enter business address"
                  className="h-12"
                />
              </div>
            </div>
          )}

          {data.profession === 'salaried' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">Company Name / நிறுவன பெயர் *</Label>
                <Input
                  id="companyName"
                  value={data.companyName}
                  onChange={(e) => updateData({ companyName: e.target.value })}
                  placeholder="Enter company name"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-sm font-medium">Designation / பதவி *</Label>
                <Input
                  id="designation"
                  value={data.designation}
                  onChange={(e) => updateData({ designation: e.target.value })}
                  placeholder="Enter designation"
                  className="h-12"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="cast" className="text-sm font-medium">Community / சமூகம் *</Label>
            <Input
              id="cast"
              value={data.cast}
              onChange={(e) => updateData({ cast: e.target.value })}
              placeholder="Enter your community"
              className="h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Wife Information */}
      <Card className="border-l-4 border-l-pink-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-6 h-6 text-pink-600" />
            Wife Information / மனைவி தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {data.wives.map((wife, index) => (
            <div key={index} className="p-6 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Wife {index + 1} / மனைவி {index + 1}</h4>
                {data.wives.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeWife(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`wife-name-${index}`}>Name / பெயர்</Label>
                  <Input
                    id={`wife-name-${index}`}
                    value={wife.name}
                    onChange={(e) => updateWifeData(index, 'name', e.target.value)}
                    placeholder="Enter wife's name"
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`wife-bloodGroup-${index}`}>Blood Group / இரத்த வகை</Label>
                  <Select
                    value={wife.bloodGroup}
                    onValueChange={(value) => updateWifeData(index, 'bloodGroup', value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`wife-occupation-${index}`}>Occupation / தொழில்</Label>
                  <Select
                    value={wife.occupation}
                    onValueChange={(value) => updateWifeData(index, 'occupation', value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housewife">Housewife / இல்லத்தரசி</SelectItem>
                      <SelectItem value="business">Business / வணிகம்</SelectItem>
                      <SelectItem value="salaried">Salaried / சம்பளம்</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {wife.occupation === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`wife-business-desc-${index}`}>Business Description / வணிக விவரம்</Label>
                    <Input
                      id={`wife-business-desc-${index}`}
                      value={wife.businessDescription}
                      onChange={(e) => updateWifeData(index, 'businessDescription', e.target.value)}
                      placeholder="Enter business description"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`wife-business-address-${index}`}>Business Address / வணிக முகவரி</Label>
                    <Input
                      id={`wife-business-address-${index}`}
                      value={wife.businessAddress}
                      onChange={(e) => updateWifeData(index, 'businessAddress', e.target.value)}
                      placeholder="Enter business address"
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {wife.occupation === 'salaried' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`wife-company-${index}`}>Company Name / நிறுவன பெயர்</Label>
                    <Input
                      id={`wife-company-${index}`}
                      value={wife.companyName}
                      onChange={(e) => updateWifeData(index, 'companyName', e.target.value)}
                      placeholder="Enter company name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`wife-designation-${index}`}>Designation / பதவி</Label>
                    <Input
                      id={`wife-designation-${index}`}
                      value={wife.designation}
                      onChange={(e) => updateWifeData(index, 'designation', e.target.value)}
                      placeholder="Enter designation"
                      className="h-12"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            onClick={addWife}
            className="w-full flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Another Wife / மற்றொரு மனைவியை சேர்க்கவும்
          </Button>
        </CardContent>
      </Card>

      {/* Family Information */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-6 h-6 text-purple-600" />
            Family Information / குடும்ப தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Do you have children? / உங்களுக்கு குழந்தைகள் உள்ளதா?</Label>
            <RadioGroup
              value={data.hasChildren ? 'yes' : 'no'}
              onValueChange={(value) => handleChildrenChange(value === 'yes')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes / ஆம்</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No / இல்லை</Label>
              </div>
            </RadioGroup>
          </div>

          {data.hasChildren && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">How many children do you have? / உங்களுக்கு எத்தனை குழந்தைகள்?</Label>
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
              Children Details / குழந்தைகளின் விவரங்கள்
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {data.children.map((child, index) => (
              <div key={index} className="p-6 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-4 text-lg">Child {index + 1} / குழந்தை {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`child-name-${index}`}>Name / பெயர் *</Label>
                    <Input
                      id={`child-name-${index}`}
                      value={child.name}
                      onChange={(e) => updateChildData(index, 'name', e.target.value)}
                      placeholder="Enter child's name"
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`child-age-${index}`}>Age / வயது *</Label>
                    <Input
                      id={`child-age-${index}`}
                      type="number"
                      value={child.age}
                      onChange={(e) => updateChildData(index, 'age', e.target.value)}
                      placeholder="Enter child's age"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`child-gender-${index}`}>Gender / பால் *</Label>
                    <Select
                      value={child.gender}
                      onValueChange={(value) => updateChildData(index, 'gender', value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male / ஆண்</SelectItem>
                        <SelectItem value="female">Female / பெண்</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`child-blood-group-${index}`}>Blood Group / இரத்த வகை *</Label>
                    <Select
                      value={child.bloodGroup}
                      onValueChange={(value) => updateChildData(index, 'bloodGroup', value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`child-status-${index}`}>Status / நிலைமை</Label>
                  <Select
                    value={child.status}
                    onValueChange={(value) => updateChildData(index, 'status', value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studying">Studying / படிக்கிறது</SelectItem>
                      <SelectItem value="working">Working / வேலை செய்கிறது</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {child.status === 'studying' && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`child-course-${index}`}>Course Details / பாடநெறி விவரங்கள்</Label>
                    <Input
                      id={`child-course-${index}`}
                      value={child.courseDetails}
                      onChange={(e) => updateChildData(index, 'courseDetails', e.target.value)}
                      placeholder="Enter course details"
                      className="h-12"
                    />
                  </div>
                )}

                {child.status === 'working' && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`child-work-${index}`}>Work Details / வேலை விவரங்கள்</Label>
                    <Input
                      id={`child-work-${index}`}
                      value={child.workDetails}
                      onChange={(e) => updateChildData(index, 'workDetails', e.target.value)}
                      placeholder="Enter work details"
                      className="h-12"
                    />
                  </div>
                )}
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
            Family Tree / குடும்ப மரம்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name / தந்தையின் பெயர் *</Label>
              <Input
                id="fatherName"
                value={data.fatherName}
                onChange={(e) => updateData({ fatherName: e.target.value })}
                placeholder="Enter father's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fatherWhatsapp">Father's WhatsApp / தந்தையின் வாட்ஸ்அப் *</Label>
              <Input
                id="fatherWhatsapp"
                type="tel"
                value={data.fatherWhatsapp}
                onChange={(e) => updateData({ fatherWhatsapp: e.target.value })}
                placeholder="Enter father's WhatsApp number"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name / தாயின் பெயர் *</Label>
              <Input
                id="motherName"
                value={data.motherName}
                onChange={(e) => updateData({ motherName: e.target.value })}
                placeholder="Enter mother's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motherWhatsapp">Mother's WhatsApp / தாயின் வாட்ஸ்அப் *</Label>
              <Input
                id="motherWhatsapp"
                type="tel"
                value={data.motherWhatsapp}
                onChange={(e) => updateData({ motherWhatsapp: e.target.value })}
                placeholder="Enter mother's WhatsApp number"
                className="h-12"
              />
            </div>
          </div>

          {/* Additional Mothers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Additional Mothers / கூடுதல் தாய்மார்கள்</Label>
              <Button
                variant="outline"
                onClick={addMother}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Mother / தாயை சேர்க்கவும்
              </Button>
            </div>

            {data.mothers.map((mother, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Mother {index + 2} / தாய் {index + 2}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMother(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`mother-name-${index}`}>Name / பெயர்</Label>
                    <Input
                      id={`mother-name-${index}`}
                      value={mother.name}
                      onChange={(e) => updateMotherData(index, 'name', e.target.value)}
                      placeholder="Enter mother's name"
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`mother-whatsapp-${index}`}>WhatsApp / வாட்ஸ்அப்</Label>
                    <Input
                      id={`mother-whatsapp-${index}`}
                      type="tel"
                      value={mother.whatsapp}
                      onChange={(e) => updateMotherData(index, 'whatsapp', e.target.value)}
                      placeholder="Enter WhatsApp number"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grandFatherName">Grandfather's Name / தாத்தாவின் பெயர்</Label>
              <Input
                id="grandFatherName"
                value={data.grandFatherName}
                onChange={(e) => updateData({ grandFatherName: e.target.value })}
                placeholder="Enter grandfather's name"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grandMotherName">Grandmother's Name / பாட்டியின் பெயர்</Label>
              <Input
                id="grandMotherName"
                value={data.grandMotherName}
                onChange={(e) => updateData({ grandMotherName: e.target.value })}
                placeholder="Enter grandmother's name"
                className="h-12"
              />
            </div>
          </div>

          {/* Additional Grandmothers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Additional Grandmothers / கூடுதல் பாட்டிகள்</Label>
              <Button
                variant="outline"
                onClick={addGrandMother}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Grandmother / பாட்டியை சேர்க்கவும்
              </Button>
            </div>

            {data.grandMothers.map((grandmother, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Grandmother {index + 2} / பாட்டி {index + 2}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeGrandMother(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`grandmother-name-${index}`}>Name / பெயர்</Label>
                  <Input
                    id={`grandmother-name-${index}`}
                    value={grandmother.name}
                    onChange={(e) => updateGrandMotherData(index, 'name', e.target.value)}
                    placeholder="Enter grandmother's name"
                    className="h-12"
                  />
                </div>
              </div>
            ))}
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
              <Label htmlFor="hasAdditionalGeneration">Add additional generation details / கூடுதல் தலைமுறை விவரங்களை சேர்க்கவும்</Label>
            </div>

            {data.hasAdditionalGeneration && (
              <div className="space-y-4">
                {data.additionalGeneration.map((gen, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Generation {index + 1} / தலைமுறை {index + 1}</h4>
                      <Button
                        variant="outline"
                        onClick={() => removeAdditionalGeneration(index)}
                        className="text-red-600 hover:text-red-700"
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
                          value={gen.name}
                          onChange={(e) => updateAdditionalGeneration(index, 'name', e.target.value)}
                          placeholder={`Enter ${getGenerationOrdinal(index).toLowerCase()} great grandfather's name`}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`additional-great-grandmother-${index}`}>
                          {getGenerationOrdinal(index)} Great Grandmother's Name / {getGenerationOrdinal(index)} மூத்த பாட்டியின் பெயர்
                        </Label>
                        <Input
                          id={`additional-great-grandmother-${index}`}
                          value={gen.relation}
                          onChange={(e) => updateAdditionalGeneration(index, 'relation', e.target.value)}
                          placeholder={`Enter ${getGenerationOrdinal(index).toLowerCase()} great grandmother's name`}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addAdditionalGeneration}
                  className="w-full"
                >
                  Add Another Generation / மற்றொரு தலைமுறையை சேர்க்கவும்
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

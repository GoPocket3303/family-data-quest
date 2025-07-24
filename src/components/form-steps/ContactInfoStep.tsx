
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '../MultiStepForm';

interface ContactInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ data, updateData }) => {
  const castes = [
    'General',
    'OBC',
    'SC',
    'ST',
    'Other'
  ];

  const handleSameAsWhatsappChange = (checked: boolean) => {
    if (checked) {
      updateData({ sameAsWhatsapp: true, whatsappNo: data.mobileNo });
    } else {
      updateData({ sameAsWhatsapp: false, whatsappNo: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cast">Cast/Category *</Label>
          <Select
            value={data.cast}
            onValueChange={(value) => updateData({ cast: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cast/category" />
            </SelectTrigger>
            <SelectContent>
              {castes.map((caste) => (
                <SelectItem key={caste} value={caste}>
                  {caste}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobileNo">Mobile Number *</Label>
          <Input
            id="mobileNo"
            type="tel"
            value={data.mobileNo}
            onChange={(e) => {
              updateData({ mobileNo: e.target.value });
              if (data.sameAsWhatsapp) {
                updateData({ whatsappNo: e.target.value });
              }
            }}
            placeholder="Enter mobile number"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAsWhatsapp"
            checked={data.sameAsWhatsapp}
            onCheckedChange={handleSameAsWhatsappChange}
          />
          <Label htmlFor="sameAsWhatsapp">
            WhatsApp number is same as mobile number
          </Label>
        </div>

        {!data.sameAsWhatsapp && (
          <div className="space-y-2">
            <Label htmlFor="whatsappNo">WhatsApp Number</Label>
            <Input
              id="whatsappNo"
              type="tel"
              value={data.whatsappNo}
              onChange={(e) => updateData({ whatsappNo: e.target.value })}
              placeholder="Enter WhatsApp number"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mailId">Email ID *</Label>
        <Input
          id="mailId"
          type="email"
          value={data.mailId}
          onChange={(e) => updateData({ mailId: e.target.value })}
          placeholder="Enter email address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={data.address}
          onChange={(e) => updateData({ address: e.target.value })}
          placeholder="Enter your complete address"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ContactInfoStep;

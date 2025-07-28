
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface ContactInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ data, updateData }) => {
  const handleSameAsWhatsappChange = (checked: boolean) => {
    if (checked) {
      updateData({ sameAsWhatsapp: true, whatsappNo: data.mobileNo });
    } else {
      updateData({ sameAsWhatsapp: false, whatsappNo: '' });
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Phone className="w-6 h-6 text-blue-600" />
          Contact Information / தொடர்பு தகவல்
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mobileNo">Mobile Number / மொபைல் எண் *</Label>
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
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalMobileNo">Additional Mobile Number / கூடுதல் மொபைல் எண்</Label>
            <Input
              id="additionalMobileNo"
              type="tel"
              value={data.additionalMobileNo}
              onChange={(e) => updateData({ additionalMobileNo: e.target.value })}
              placeholder="Enter additional mobile number"
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sameAsWhatsapp"
              checked={data.sameAsWhatsapp}
              onChange={(e) => handleSameAsWhatsappChange(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="sameAsWhatsapp">
              WhatsApp number is same as mobile number / வாட்ஸ்அப் எண் மொபைல் எண்ணுக்கு சமம்
            </Label>
          </div>

          {!data.sameAsWhatsapp && (
            <div className="space-y-2">
              <Label htmlFor="whatsappNo">WhatsApp Number / வாட்ஸ்அப் எண்</Label>
              <Input
                id="whatsappNo"
                type="tel"
                value={data.whatsappNo}
                onChange={(e) => updateData({ whatsappNo: e.target.value })}
                placeholder="Enter WhatsApp number"
                className="h-12"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mailId" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email ID / மின்னஞ்சல் முகவரி *
          </Label>
          <Input
            id="mailId"
            type="email"
            value={data.mailId}
            onChange={(e) => updateData({ mailId: e.target.value })}
            placeholder="Enter email address"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address / முகவரி *
          </Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Enter your complete address"
            rows={4}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoStep;

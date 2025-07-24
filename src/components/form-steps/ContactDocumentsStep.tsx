
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Upload, User, Users } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface ContactDocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ContactDocumentsStep: React.FC<ContactDocumentsStepProps> = ({ data, updateData }) => {
  const documentsRef = useRef<HTMLInputElement>(null);
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const familyPhotoRef = useRef<HTMLInputElement>(null);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateData({ documents: files });
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ profilePhoto: file });
  };

  const handleFamilyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ familyPhoto: file });
  };

  const handleWhatsappSync = (checked: boolean) => {
    updateData({ 
      sameAsWhatsapp: checked,
      whatsappNo: checked ? data.mobileNo : data.whatsappNo
    });
  };

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Phone className="w-6 h-6 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cast">Cast/Community *</Label>
            <Select
              value={data.cast}
              onValueChange={(value) => updateData({ cast: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your cast/community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="obc">OBC</SelectItem>
                <SelectItem value="sc">SC</SelectItem>
                <SelectItem value="st">ST</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address *
            </Label>
            <Textarea
              id="address"
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              placeholder="Enter your complete address"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile Number *</Label>
              <Input
                id="mobileNo"
                type="tel"
                value={data.mobileNo}
                onChange={(e) => updateData({ mobileNo: e.target.value })}
                placeholder="Enter your mobile number"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsappNo">WhatsApp Number</Label>
              <div className="space-y-2">
                <Input
                  id="whatsappNo"
                  type="tel"
                  value={data.whatsappNo}
                  onChange={(e) => updateData({ whatsappNo: e.target.value })}
                  placeholder="Enter your WhatsApp number"
                  className="h-12"
                  disabled={data.sameAsWhatsapp}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAsWhatsapp"
                    checked={data.sameAsWhatsapp}
                    onChange={(e) => handleWhatsappSync(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="sameAsWhatsapp" className="text-sm">
                    Same as mobile number
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mailId" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="mailId"
              type="email"
              value={data.mailId}
              onChange={(e) => updateData({ mailId: e.target.value })}
              placeholder="Enter your email address"
              className="h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents & Photos */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Upload className="w-6 h-6 text-green-600" />
            Documents & Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile Photo
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => profilePhotoRef.current?.click()}
                  className="h-12"
                >
                  Choose Profile Photo
                </Button>
                {data.profilePhoto && (
                  <span className="text-sm text-gray-600">
                    {data.profilePhoto.name}
                  </span>
                )}
              </div>
              <input
                ref={profilePhotoRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Family Photo
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => familyPhotoRef.current?.click()}
                  className="h-12"
                >
                  Choose Family Photo
                </Button>
                {data.familyPhoto && (
                  <span className="text-sm text-gray-600">
                    {data.familyPhoto.name}
                  </span>
                )}
              </div>
              <input
                ref={familyPhotoRef}
                type="file"
                accept="image/*"
                onChange={handleFamilyPhotoUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => documentsRef.current?.click()}
                  className="h-12"
                >
                  Upload Documents
                </Button>
                {data.documents.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {data.documents.length} file(s) selected
                  </span>
                )}
              </div>
              <input
                ref={documentsRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDocumentsStep;

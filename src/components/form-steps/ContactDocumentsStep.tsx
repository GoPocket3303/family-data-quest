import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Upload, Camera, FileText } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface ContactDocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ContactDocumentsStep: React.FC<ContactDocumentsStepProps> = ({ data, updateData }) => {
  const handleSameAsWhatsappChange = (checked: boolean) => {
    if (checked) {
      updateData({ sameAsWhatsapp: true, whatsappNo: data.mobileNo });
    } else {
      updateData({ sameAsWhatsapp: false, whatsappNo: '' });
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ profilePhoto: e.target.files[0] });
    }
  };

  const handleFamilyPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ familyPhoto: e.target.files[0] });
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocuments = Array.from(e.target.files);
      updateData({ documents: [...data.documents, ...newDocuments] });
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = data.documents.filter((_, i) => i !== index);
    updateData({ documents: newDocuments });
  };

  return (
    <div className="space-y-8">
      {/* Contact Information */}
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
              <Label htmlFor="mobileNo" className="text-sm font-medium">Mobile Number / கைபேசி எண் *</Label>
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
              <Label htmlFor="mailId" className="text-sm font-medium">Email ID / மின்னஞ்சல் *</Label>
              <Input
                id="mailId"
                type="email"
                value={data.mailId}
                onChange={(e) => updateData({ mailId: e.target.value })}
                placeholder="Enter email address"
                className="h-12"
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
              <Label htmlFor="sameAsWhatsapp" className="text-sm">
                WhatsApp number is same as mobile number / WhatsApp எண் கைபேசி எண்ணுக்கு சமம்
              </Label>
            </div>

            {!data.sameAsWhatsapp && (
              <div className="space-y-2">
                <Label htmlFor="whatsappNo" className="text-sm font-medium">WhatsApp Number / WhatsApp எண் *</Label>
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
            <Label htmlFor="address" className="text-sm font-medium">Address / முகவரி *</Label>
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

      {/* Documents Upload */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Upload className="w-6 h-6 text-green-600" />
            Documents & Photos / ஆவணங்கள் மற்றும் படங்கள்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Camera className="w-5 h-5" />
              Profile Photo / சுயவிவரப் படம் *
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
                id="profile-photo"
              />
              <label
                htmlFor="profile-photo"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload profile photo / சுயவிவரப் படத்தை பதிவேற்ற கிளிக் செய்யவும்
                </span>
              </label>
              {data.profilePhoto && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ {data.profilePhoto.name} uploaded
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Family Photo */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Camera className="w-5 h-5" />
              Family Photo / குடும்பப் படம் (Optional / விருப்பமுள்ள)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFamilyPhotoChange}
                className="hidden"
                id="family-photo"
              />
              <label
                htmlFor="family-photo"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload family photo / குடும்பப் படத்தை பதிவேற்ற கிளிக் செய்யவும்
                </span>
              </label>
              {data.familyPhoto && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ {data.familyPhoto.name} uploaded
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Other Documents */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="w-5 h-5" />
              Other Documents / மற்ற ஆவணங்கள் (Optional / விருப்பமுள்ள)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleDocumentsChange}
                className="hidden"
                id="documents"
              />
              <label
                htmlFor="documents"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload additional documents / கூடுதல் ஆவணங்களை பதிவேற்ற கிளிக் செய்யவும்
                </span>
                <span className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG
                </span>
              </label>
            </div>
            
            {data.documents.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Documents:</Label>
                {data.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{doc.name}</span>
                    <button
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDocumentsStep;


import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Image } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface DocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({ data, updateData }) => {
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateData({ documents: [...data.documents, ...files] });
  };

  const removeDocument = (index: number) => {
    const newDocuments = data.documents.filter((_, i) => i !== index);
    updateData({ documents: newDocuments });
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ profilePhoto: file });
  };

  const handleFamilyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ familyPhoto: file });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Profile Photo *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {data.profilePhoto ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Image className="w-6 h-6 text-green-500" />
                <span className="text-sm text-green-600">{data.profilePhoto.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => updateData({ profilePhoto: null })}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <Label htmlFor="profilePhoto" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>Upload Profile Photo</span>
                  </Button>
                </Label>
                <Input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Family Photo</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {data.familyPhoto ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Image className="w-6 h-6 text-green-500" />
                <span className="text-sm text-green-600">{data.familyPhoto.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => updateData({ familyPhoto: null })}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <Label htmlFor="familyPhoto" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>Upload Family Photo</span>
                  </Button>
                </Label>
                <Input
                  id="familyPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleFamilyPhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Additional Documents</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <Label htmlFor="documents" className="cursor-pointer">
                <Button type="button" variant="outline" asChild>
                  <span>Upload Documents</span>
                </Button>
              </Label>
              <Input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">
              Upload ID proof, address proof, or any other relevant documents
            </p>
          </div>
        </div>

        {data.documents.length > 0 && (
          <div className="space-y-2">
            <Label className="font-medium">Uploaded Documents:</Label>
            {data.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{doc.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsStep;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, Users, Baby, TreePine, Phone, Mail, Upload } from 'lucide-react';
import { FormData } from '../MultiStepForm';

interface ReviewStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h3>
        <p className="text-gray-600">Please review all the information before submitting</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Name:</span>
            <p className="text-gray-600">{data.name || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Age:</span>
            <p className="text-gray-600">{data.age || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Wife's Name:</span>
            <p className="text-gray-600">{data.wifeName || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Family Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Family Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="font-medium">Has Children:</span>
            <Badge variant={data.hasChildren ? 'default' : 'secondary'} className="ml-2">
              {data.hasChildren ? 'Yes' : 'No'}
            </Badge>
          </div>
          
          {data.hasChildren && (
            <div className="space-y-4">
              <div>
                <span className="font-medium">Number of Children:</span>
                <Badge variant="outline" className="ml-2">{data.childrenCount}</Badge>
              </div>
              
              <div className="space-y-2">
                <span className="font-medium">Children Details:</span>
                {data.children.map((child, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Baby className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Child {index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {child.name} • {child.age} years old • {child.gender}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generation Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-orange-600" />
            Family Tree
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Father's Name:</span>
            <p className="text-gray-600">{data.fatherName || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Mother's Name:</span>
            <p className="text-gray-600">{data.motherName || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Grandfather's Name:</span>
            <p className="text-gray-600">{data.grandFatherName || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Grandmother's Name:</span>
            <p className="text-gray-600">{data.grandMotherName || 'Not provided'}</p>
          </div>
          
          {data.hasAdditionalGeneration && data.additionalGeneration.length > 0 && (
            <div className="md:col-span-2">
              <span className="font-medium">Additional Generation:</span>
              <div className="mt-2 space-y-1">
                {data.additionalGeneration.map((gen, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {gen.name} ({gen.relation})
                  </p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Cast/Community:</span>
              <p className="text-gray-600">{data.cast || 'Not provided'}</p>
            </div>
            <div>
              <span className="font-medium">Mobile Number:</span>
              <p className="text-gray-600">{data.mobileNo || 'Not provided'}</p>
            </div>
            <div>
              <span className="font-medium">WhatsApp Number:</span>
              <p className="text-gray-600">{data.whatsappNo || 'Not provided'}</p>
            </div>
            <div>
              <span className="font-medium flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email:
              </span>
              <p className="text-gray-600">{data.mailId || 'Not provided'}</p>
            </div>
          </div>
          
          <div>
            <span className="font-medium">Address:</span>
            <p className="text-gray-600">{data.address || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-600" />
            Documents & Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium">Profile Photo:</span>
              <p className="text-gray-600">
                {data.profilePhoto ? data.profilePhoto.name : 'Not uploaded'}
              </p>
            </div>
            <div>
              <span className="font-medium">Family Photo:</span>
              <p className="text-gray-600">
                {data.familyPhoto ? data.familyPhoto.name : 'Not uploaded'}
              </p>
            </div>
            <div>
              <span className="font-medium">Documents:</span>
              <p className="text-gray-600">
                {data.documents.length > 0 ? `${data.documents.length} file(s)` : 'None uploaded'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;

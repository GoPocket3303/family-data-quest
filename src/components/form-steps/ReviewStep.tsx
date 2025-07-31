
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, Users, Baby, TreePine, Phone, Mail, Upload, Heart } from 'lucide-react';
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
            <span className="font-medium">Blood Group:</span>
            <p className="text-gray-600">{data.bloodGroup || 'Not provided'}</p>
          </div>
          <div>
            <span className="font-medium">Profession:</span>
            <p className="text-gray-600">{data.profession || 'Not provided'}</p>
          </div>
          {data.profession === 'business' && (
            <>
              <div>
                <span className="font-medium">Business Description:</span>
                <p className="text-gray-600">{data.businessDescription || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium">Business Address:</span>
                <p className="text-gray-600">{data.businessAddress || 'Not provided'}</p>
              </div>
            </>
          )}
          {data.profession === 'salaried' && (
            <>
              <div>
                <span className="font-medium">Company Name:</span>
                <p className="text-gray-600">{data.companyName || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium">Designation:</span>
                <p className="text-gray-600">{data.designation || 'Not provided'}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Wife Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            Wife Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.wives.map((wife, index) => (
            wife.name && (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span className="font-medium">Wife {index + 1}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Name:</span>
                    <p className="text-gray-600">{wife.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Occupation:</span>
                    <p className="text-gray-600">{wife.occupation || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium">WhatsApp Number:</span>
                    <p className="text-gray-600">{wife.whatsappNo || 'Not provided'}</p>
                  </div>
                  {wife.occupation === 'business' && (
                    <>
                      <div>
                        <span className="font-medium">Business Description:</span>
                        <p className="text-gray-600">{wife.businessDescription || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Business Address:</span>
                        <p className="text-gray-600">{wife.businessAddress || 'Not provided'}</p>
                      </div>
                    </>
                  )}
                  {wife.occupation === 'salaried' && (
                    <>
                      <div>
                        <span className="font-medium">Company Name:</span>
                        <p className="text-gray-600">{wife.companyName || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Designation:</span>
                        <p className="text-gray-600">{wife.designation || 'Not provided'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          ))}
          {!data.wives.some(wife => wife.name) && (
            <p className="text-gray-500 italic">No wife information provided</p>
          )}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {child.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Age:</span> {child.age} years old
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Gender:</span> {child.gender}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Blood Group:</span> {child.bloodGroup || 'Not provided'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span> {child.status || 'Not provided'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">WhatsApp Number:</span> {child.whatsappNo || 'Not provided'}
                      </p>
                      {child.status === 'studying' && child.courseDetails && (
                        <p className="text-gray-600">
                          <span className="font-medium">Course Details:</span> {child.courseDetails}
                        </p>
                      )}
                      {child.status === 'working' && child.workDetails && (
                        <p className="text-gray-600">
                          <span className="font-medium">Work Details:</span> {child.workDetails}
                        </p>
                      )}
                    </div>
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
              <span className="font-medium">பட்டப்பெயர் / கூட்டம்:</span>
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

      {/* Documents & Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-600" />
            Documents & Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div>
            <span className="font-medium block mb-2">Profile Photo:</span>
            {data.profilePhoto ? (
              <div className="flex flex-col items-start gap-2">
                <img 
                  src={URL.createObjectURL(data.profilePhoto)} 
                  alt="Profile Photo"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                />
                <p className="text-sm text-gray-600">{data.profilePhoto.name}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Not uploaded</p>
            )}
          </div>

          {/* Family Photo */}
          <div>
            <span className="font-medium block mb-2">Family Photo:</span>
            {data.familyPhoto ? (
              <div className="flex flex-col items-start gap-2">
                <img 
                  src={URL.createObjectURL(data.familyPhoto)} 
                  alt="Family Photo"
                  className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                />
                <p className="text-sm text-gray-600">{data.familyPhoto.name}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Not uploaded</p>
            )}
          </div>

          {/* Documents */}
          <div>
            <span className="font-medium block mb-2">Additional Documents:</span>
            {data.documents.length > 0 ? (
              <div className="space-y-2">
                {data.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Upload className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No additional documents uploaded</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;

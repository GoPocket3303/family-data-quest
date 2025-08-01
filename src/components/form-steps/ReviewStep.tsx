
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information / உங்கள் தகவல்களை மீளாய்வு செய்யுங்கள்</h3>
        <p className="text-gray-600">Please review all the information before submitting / சமர்ப்பிக்கும் முன் அனைத்து தகவல்களையும் மீளாய்வு செய்யுங்கள்</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information / தனிப்பட்ட தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Name / பெயர்:</span>
            <p className="text-gray-600">{data.name || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Age / வயது:</span>
            <p className="text-gray-600">{data.age || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Blood Group / இரத்த வகை:</span>
            <p className="text-gray-600">{data.bloodGroup || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Profession / தொழில்:</span>
            <p className="text-gray-600">{data.profession || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          {data.profession === 'business' && (
            <>
              <div>
                <span className="font-medium">Business Description / வணிக விளக்கம்:</span>
                <p className="text-gray-600">{data.businessDescription || 'Not provided / வழங்கப்படவில்லை'}</p>
              </div>
              <div>
                <span className="font-medium">Business Address / வணிக முகவரி:</span>
                <p className="text-gray-600">{data.businessAddress || 'Not provided / வழங்கப்படவில்லை'}</p>
              </div>
            </>
          )}
          {data.profession === 'salaried' && (
            <>
              <div>
                <span className="font-medium">Company Name / நிறுவன பெயர்:</span>
                <p className="text-gray-600">{data.companyName || 'Not provided / வழங்கப்படவில்லை'}</p>
              </div>
              <div>
                <span className="font-medium">Designation / பதவி:</span>
                <p className="text-gray-600">{data.designation || 'Not provided / வழங்கப்படவில்லை'}</p>
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
            Wife Information / மனைவி தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.wives.map((wife, index) => (
            wife.name && (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span className="font-medium">Wife {index + 1} / மனைவி {index + 1}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Name / பெயர்:</span>
                    <p className="text-gray-600">{wife.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Occupation / தொழில்:</span>
                    <p className="text-gray-600">{wife.occupation || 'Not provided / வழங்கப்படவில்லை'}</p>
                  </div>
                  {wife.occupation === 'business' && (
                    <>
                      <div>
                        <span className="font-medium">Business Description / வணிக விளக்கம்:</span>
                        <p className="text-gray-600">{wife.businessDescription || 'Not provided / வழங்கப்படவில்லை'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Business Address / வணிக முகவரி:</span>
                        <p className="text-gray-600">{wife.businessAddress || 'Not provided / வழங்கப்படவில்லை'}</p>
                      </div>
                    </>
                  )}
                  {wife.occupation === 'salaried' && (
                    <>
                      <div>
                        <span className="font-medium">Company Name / நிறுவன பெயர்:</span>
                        <p className="text-gray-600">{wife.companyName || 'Not provided / வழங்கப்படவில்லை'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Designation / பதவி:</span>
                        <p className="text-gray-600">{wife.designation || 'Not provided / வழங்கப்படவில்லை'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          ))}
          {!data.wives.some(wife => wife.name) && (
            <p className="text-gray-500 italic">No wife information provided / மனைவி தகவல் வழங்கப்படவில்லை</p>
          )}
        </CardContent>
      </Card>

      {/* Family Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Family Information / குடும்ப தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="font-medium">Has Children / குழந்தைகள் உள்ளனவா:</span>
            <Badge variant={data.hasChildren ? 'default' : 'secondary'} className="ml-2">
              {data.hasChildren ? 'Yes / ஆம்' : 'No / இல்லை'}
            </Badge>
          </div>
          
          {data.hasChildren && (
            <div className="space-y-4">
              <div>
                <span className="font-medium">Number of Children / குழந்தைகளின் எண்ணிக்கை:</span>
                <Badge variant="outline" className="ml-2">{data.childrenCount}</Badge>
              </div>
              
              <div className="space-y-2">
                <span className="font-medium">Children Details / குழந்தைகளின் விவரங்கள்:</span>
                {data.children.map((child, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Baby className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Child {index + 1} / குழந்தை {index + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Name / பெயர்:</span> {child.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Age / வயது:</span> {child.age} years old / வயது
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Gender / பாலினம்:</span> {child.gender}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Blood Group / இரத்த வகை:</span> {child.bloodGroup || 'Not provided / வழங்கப்படவில்லை'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Status / நிலை:</span> {child.status || 'Not provided / வழங்கப்படவில்லை'}
                      </p>
                      {child.status === 'studying' && child.courseDetails && (
                        <p className="text-gray-600">
                          <span className="font-medium">Course Details / படிப்பு விவரங்கள்:</span> {child.courseDetails}
                        </p>
                      )}
                      {child.status === 'working' && child.workDetails && (
                        <p className="text-gray-600">
                          <span className="font-medium">Work Details / வேலை விவரங்கள்:</span> {child.workDetails}
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
            Family Tree / குடும்ப மரம்
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Father's Name / தந்தையின் பெயர்:</span>
            <p className="text-gray-600">{data.fatherName || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Mother's Name / தாயின் பெயர்:</span>
            <p className="text-gray-600">{data.motherName || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Grandfather's Name / தாத்தாவின் பெயர்:</span>
            <p className="text-gray-600">{data.grandFatherName || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          <div>
            <span className="font-medium">Grandmother's Name / பாட்டியின் பெயர்:</span>
            <p className="text-gray-600">{data.grandMotherName || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
          
          {data.hasAdditionalGeneration && data.additionalGeneration.length > 0 && (
            <div className="md:col-span-2">
              <span className="font-medium">Additional Generation / கூடுதல் தலைமுறை:</span>
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
            Contact Information / தொடர்பு தகவல்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Cast/Community / பட்டப்பெயர் / கூட்டம்:</span>
              <p className="text-gray-600">{data.cast || 'Not provided / வழங்கப்படவில்லை'}</p>
            </div>
            <div>
              <span className="font-medium">Mobile Number / மொபைல் எண்:</span>
              <p className="text-gray-600">{data.mobileNo || 'Not provided / வழங்கப்படவில்லை'}</p>
            </div>
            <div>
              <span className="font-medium">WhatsApp Number / வாட்ஸ்அப் எண்:</span>
              <p className="text-gray-600">{data.whatsappNo || 'Not provided / வழங்கப்படவில்லை'}</p>
            </div>
            <div>
              <span className="font-medium flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email / மின்னஞ்சல்:
              </span>
              <p className="text-gray-600">{data.mailId || 'Not provided / வழங்கப்படவில்லை'}</p>
            </div>
          </div>
          
          <div>
            <span className="font-medium">Address / முகவரி:</span>
            <p className="text-gray-600">{data.address || 'Not provided / வழங்கப்படவில்லை'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-600" />
            Documents & Photos / ஆவணங்கள் மற்றும் புகைப்படங்கள்
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium">Profile Photo / சுயவிவர புகைப்படம்:</span>
              <p className="text-gray-600">
                {data.profilePhoto ? data.profilePhoto.name : 'Not uploaded / பதிவேற்றப்படவில்லை'}
              </p>
            </div>
            <div>
              <span className="font-medium">Family Photo / குடும்ப புகைப்படம்:</span>
              <p className="text-gray-600">
                {data.familyPhoto ? data.familyPhoto.name : 'Not uploaded / பதிவேற்றப்படவில்லை'}
              </p>
            </div>
            <div>
              <span className="font-medium">Documents / ஆவணங்கள்:</span>
              <p className="text-gray-600">
                {data.documents.length > 0 ? `${data.documents.length} file(s) / கோப்பு(கள்)` : 'None uploaded / பதிவேற்றப்படவில்லை'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;

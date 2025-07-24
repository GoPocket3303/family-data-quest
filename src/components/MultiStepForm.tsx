
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { toast } from 'sonner';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import FamilyInfoStep from './form-steps/FamilyInfoStep';
import ChildrenInfoStep from './form-steps/ChildrenInfoStep';
import GenerationInfoStep from './form-steps/GenerationInfoStep';
import ContactInfoStep from './form-steps/ContactInfoStep';
import DocumentsStep from './form-steps/DocumentsStep';

export interface FormData {
  // Personal Info
  name: string;
  age: string;
  wifeName: string;
  
  // Family Info
  hasChildren: boolean;
  childrenCount: number;
  
  // Children Details
  children: Array<{
    name: string;
    age: string;
    gender: string;
  }>;
  
  // Generation Info
  fatherName: string;
  motherName: string;
  grandFatherName: string;
  grandMotherName: string;
  hasAdditionalGeneration: boolean;
  additionalGeneration: Array<{
    name: string;
    relation: string;
  }>;
  
  // Contact Info
  cast: string;
  address: string;
  mobileNo: string;
  whatsappNo: string;
  sameAsWhatsapp: boolean;
  mailId: string;
  
  // Documents
  documents: File[];
  profilePhoto: File | null;
  familyPhoto: File | null;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 6;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    wifeName: '',
    hasChildren: false,
    childrenCount: 0,
    children: [],
    fatherName: '',
    motherName: '',
    grandFatherName: '',
    grandMotherName: '',
    hasAdditionalGeneration: false,
    additionalGeneration: [],
    cast: '',
    address: '',
    mobileNo: '',
    whatsappNo: '',
    sameAsWhatsapp: false,
    mailId: '',
    documents: [],
    profilePhoto: null,
    familyPhoto: null,
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const formDataToSubmit = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'documents' && Array.isArray(value)) {
          value.forEach((file, index) => {
            formDataToSubmit.append(`documents_${index}`, file);
          });
        } else if (key === 'profilePhoto' && value) {
          formDataToSubmit.append('profilePhoto', value);
        } else if (key === 'familyPhoto' && value) {
          formDataToSubmit.append('familyPhoto', value);
        } else if (typeof value === 'object') {
          formDataToSubmit.append(key, JSON.stringify(value));
        } else {
          formDataToSubmit.append(key, value.toString());
        }
      });

      const response = await fetch('https://n8n.gopocket.in/webhook/yuvaraj', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        toast.success('Form submitted successfully!');
        // Reset form
        setFormData({
          name: '',
          age: '',
          wifeName: '',
          hasChildren: false,
          childrenCount: 0,
          children: [],
          fatherName: '',
          motherName: '',
          grandFatherName: '',
          grandMotherName: '',
          hasAdditionalGeneration: false,
          additionalGeneration: [],
          cast: '',
          address: '',
          mobileNo: '',
          whatsappNo: '',
          sameAsWhatsapp: false,
          mailId: '',
          documents: [],
          profilePhoto: null,
          familyPhoto: null,
        });
        setCurrentStep(1);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData} updateData={updateFormData} />;
      case 2:
        return <FamilyInfoStep data={formData} updateData={updateFormData} />;
      case 3:
        return <ChildrenInfoStep data={formData} updateData={updateFormData} />;
      case 4:
        return <GenerationInfoStep data={formData} updateData={updateFormData} />;
      case 5:
        return <ContactInfoStep data={formData} updateData={updateFormData} />;
      case 6:
        return <DocumentsStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Information',
    'Family Details',
    'Children Information',
    'Generation Details',
    'Contact Information',
    'Documents & Photos'
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">User Registration Form</h1>
          <p className="text-gray-600">Please fill out all the required information</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-center text-2xl">
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </CardTitle>
            <Progress value={progress} className="mt-4 bg-white/20" />
          </CardHeader>
          
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiStepForm;

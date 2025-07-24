
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { toast } from 'sonner';
import PersonalFamilyStep from './form-steps/PersonalFamilyStep';
import ContactDocumentsStep from './form-steps/ContactDocumentsStep';
import ReviewStep from './form-steps/ReviewStep';

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
  const totalSteps = 3;

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
        return <PersonalFamilyStep data={formData} updateData={updateFormData} />;
      case 2:
        return <ContactDocumentsStep data={formData} updateData={updateFormData} />;
      case 3:
        return <ReviewStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal & Family Details',
    'Contact & Documents',
    'Review & Submit'
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            User Registration Form
          </h1>
          <p className="text-gray-600 text-lg">Complete your registration in just 3 simple steps</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-3xl font-light">
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <div className="flex justify-center items-center gap-4 mt-6">
              <span className="text-sm opacity-90">Step {currentStep} of {totalSteps}</span>
              <Progress value={progress} className="flex-1 max-w-md bg-white/20 h-2" />
              <span className="text-sm opacity-90">{Math.round(progress)}%</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 lg:p-12">
            {renderStep()}
            
            <div className="flex justify-between items-center mt-12 pt-8 border-t">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 px-8"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="lg"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  <Send className="w-5 h-5" />
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

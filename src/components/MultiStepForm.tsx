import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import PersonalFamilyStep from './form-steps/PersonalFamilyStep';
import ContactDocumentsStep from './form-steps/ContactDocumentsStep';
import ReviewStep from './form-steps/ReviewStep';
import { Loading } from '@/components/ui/loading';

export interface FormData {
  name: string;
  age: string;
  bloodGroup: string;
  profession: string;
  businessDescription: string;
  businessAddress: string;
  companyName: string;
  designation: string;
  cast: string;
  hasChildren: boolean;
  childrenCount: number;
  children: { name: string; age: string; gender: string; bloodGroup: string; status: string; courseDetails: string; workDetails: string; }[];
  fatherName: string;
  fatherWhatsapp: string;
  motherName: string;
  motherWhatsapp: string;
  grandFatherName: string;
  grandMotherName: string;
  hasAdditionalGeneration: boolean;
  additionalGeneration: { name: string; relation: string; }[];
  wives: { name: string; bloodGroup: string; occupation: string; businessDescription: string; businessAddress: string; companyName: string; designation: string; }[];
  mothers: { name: string; whatsapp: string; }[];
  grandMothers: { name: string; }[];
  address: string;
  whatsapp: string;
  email: string;
  aadharNumber: string;
  panNumber: string;
  rationCardNumber: string;
  voterIdNumber: string;
  drivingLicenseNumber: string;
  passportNumber: string;
  photo: string;
  aadharCard: string;
  panCard: string;
  rationCard: string;
  voterId: string;
  drivingLicense: string;
  passport: string;
  otherDocuments: string;
}

const defaultFormData: FormData = {
  name: '',
  age: '',
  bloodGroup: '',
  profession: '',
  businessDescription: '',
  businessAddress: '',
  companyName: '',
  designation: '',
  cast: '',
  hasChildren: false,
  childrenCount: 0,
  children: [],
  fatherName: '',
  fatherWhatsapp: '',
  motherName: '',
  motherWhatsapp: '',
  grandFatherName: '',
  grandMotherName: '',
  hasAdditionalGeneration: false,
  additionalGeneration: [],
  wives: [{ name: '', bloodGroup: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '' }],
  mothers: [{ name: '', whatsapp: '' }],
  grandMothers: [{ name: '' }],
  address: '',
  whatsapp: '',
  email: '',
  aadharNumber: '',
  panNumber: '',
  rationCardNumber: '',
  voterIdNumber: '',
  drivingLicenseNumber: '',
  passportNumber: '',
  photo: '',
  aadharCard: '',
  panCard: '',
  rationCard: '',
  voterId: '',
  drivingLicense: '',
  passport: '',
  otherDocuments: '',
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 'personal', title: 'Personal & Family Info' },
    { id: 'contact', title: 'Contact & Documents' },
    { id: 'review', title: 'Review & Submit' },
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalFamilyStep data={formData} updateData={updateFormData} />;
      case 1:
        return <ContactDocumentsStep data={formData} updateData={updateFormData} />;
      case 2:
        return <ReviewStep data={formData} />;
      default:
        return <div>Not found</div>;
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://n8n.gopocket.in/webhook/yuvaraj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Form submitted successfully!');
        setCurrentStep(steps.length - 1);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading message="Submitting your registration..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Banner Image */}
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/dc2f88e9-f341-4045-9583-27d7a9ebc0e4.png" 
            alt="அருளமிகு இருளாம்சாமி துணை"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Step {currentStep + 1} of {steps.length}
            </h2>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2 text-gray-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl text-center">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={submitForm}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;

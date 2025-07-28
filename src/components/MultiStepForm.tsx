import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PersonalFamilyStep from './form-steps/PersonalFamilyStep';
import ContactDocumentsStep from './form-steps/ContactDocumentsStep';
import ReviewStep from './form-steps/ReviewStep';

export interface FormData {
  // Personal Info
  name: string;
  age: string;
  bloodGroup: string;
  profession: string;
  businessDescription: string;
  businessAddress: string;
  companyName: string;
  designation: string;
  
  // Wife Info
  wives: Array<{
    name: string;
    occupation: string;
    businessDescription: string;
    businessAddress: string;
    companyName: string;
    designation: string;
  }>;
  
  // Family Info
  hasChildren: boolean;
  childrenCount: number;
  
  // Children Details
  children: Array<{
    name: string;
    age: string;
    gender: string;
    bloodGroup: string;
    status: string;
    courseDetails: string;
    workDetails: string;
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSteps = 3;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    bloodGroup: '',
    profession: '',
    businessDescription: '',
    businessAddress: '',
    companyName: '',
    designation: '',
    wives: [{ name: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '' }],
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

  // Calculate progress based on completed fields
  const calculateProgress = () => {
    const requiredFields = [
      'name', 'age', 'bloodGroup', 'profession', 'cast', 'fatherName', 'motherName', 'address', 'mobileNo', 'whatsappNo', 'mailId'
    ];
    
    let completedFields = 0;
    let totalFields = requiredFields.length;
    
    // Count required fields
    requiredFields.forEach(field => {
      if (formData[field as keyof FormData] && formData[field as keyof FormData] !== '') {
        completedFields++;
      }
    });
    
    // Add profession-specific fields
    if (formData.profession === 'business') {
      totalFields += 2; // businessDescription, businessAddress
      if (formData.businessDescription) completedFields++;
      if (formData.businessAddress) completedFields++;
    } else if (formData.profession === 'salaried') {
      totalFields += 2; // companyName, designation
      if (formData.companyName) completedFields++;
      if (formData.designation) completedFields++;
    }
    
    // Add wife fields
    formData.wives.forEach((wife, index) => {
      if (wife.name) {
        totalFields += 2; // name, occupation
        completedFields++;
        if (wife.occupation) completedFields++;
        
        if (wife.occupation === 'business') {
          totalFields += 2; // businessDescription, businessAddress
          if (wife.businessDescription) completedFields++;
          if (wife.businessAddress) completedFields++;
        } else if (wife.occupation === 'salaried') {
          totalFields += 2; // companyName, designation
          if (wife.companyName) completedFields++;
          if (wife.designation) completedFields++;
        }
      }
    });
    
    // Add children fields if applicable
    if (formData.hasChildren) {
      formData.children.forEach((child, index) => {
        totalFields += 4; // name, age, gender, bloodGroup
        if (child.name) completedFields++;
        if (child.age) completedFields++;
        if (child.gender) completedFields++;
        if (child.bloodGroup) completedFields++;
        
        if (child.status) {
          totalFields += 1;
          completedFields++;
          
          if (child.status === 'studying' && child.courseDetails) {
            totalFields += 1;
            completedFields++;
          } else if (child.status === 'working' && child.workDetails) {
            totalFields += 1;
            completedFields++;
          }
        }
      });
    }
    
    // Add additional generation fields if applicable
    if (formData.hasAdditionalGeneration) {
      formData.additionalGeneration.forEach((gen, index) => {
        totalFields += 2; // name, relation
        if (gen.name) completedFields++;
        if (gen.relation) completedFields++;
      });
    }
    
    // Add document fields
    totalFields += 1; // profile photo (required)
    if (formData.profilePhoto) completedFields++;
    
    return (completedFields / totalFields) * 100;
  };

  useEffect(() => {
    const newProgress = calculateProgress();
    setProgress(newProgress);
  }, [formData]);

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
      
      // Basic fields
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('age', formData.age);
      formDataToSubmit.append('bloodGroup', formData.bloodGroup);
      formDataToSubmit.append('profession', formData.profession);
      formDataToSubmit.append('businessDescription', formData.businessDescription);
      formDataToSubmit.append('businessAddress', formData.businessAddress);
      formDataToSubmit.append('companyName', formData.companyName);
      formDataToSubmit.append('designation', formData.designation);
      formDataToSubmit.append('hasChildren', formData.hasChildren.toString());
      formDataToSubmit.append('childrenCount', formData.childrenCount.toString());
      formDataToSubmit.append('fatherName', formData.fatherName);
      formDataToSubmit.append('motherName', formData.motherName);
      formDataToSubmit.append('grandFatherName', formData.grandFatherName);
      formDataToSubmit.append('grandMotherName', formData.grandMotherName);
      formDataToSubmit.append('hasAdditionalGeneration', formData.hasAdditionalGeneration.toString());
      formDataToSubmit.append('cast', formData.cast);
      formDataToSubmit.append('address', formData.address);
      formDataToSubmit.append('mobileNo', formData.mobileNo);
      formDataToSubmit.append('whatsappNo', formData.whatsappNo);
      formDataToSubmit.append('sameAsWhatsapp', formData.sameAsWhatsapp.toString());
      formDataToSubmit.append('mailId', formData.mailId);

      // Wives as individual fields
      formData.wives.forEach((wife, index) => {
        if (wife.name) {
          formDataToSubmit.append(`wife_${index + 1}_name`, wife.name);
          formDataToSubmit.append(`wife_${index + 1}_occupation`, wife.occupation);
          formDataToSubmit.append(`wife_${index + 1}_businessDescription`, wife.businessDescription);
          formDataToSubmit.append(`wife_${index + 1}_businessAddress`, wife.businessAddress);
          formDataToSubmit.append(`wife_${index + 1}_companyName`, wife.companyName);
          formDataToSubmit.append(`wife_${index + 1}_designation`, wife.designation);
        }
      });

      // Children as individual fields
      formData.children.forEach((child, index) => {
        formDataToSubmit.append(`child_${index + 1}_name`, child.name);
        formDataToSubmit.append(`child_${index + 1}_age`, child.age);
        formDataToSubmit.append(`child_${index + 1}_gender`, child.gender);
        formDataToSubmit.append(`child_${index + 1}_bloodGroup`, child.bloodGroup);
        formDataToSubmit.append(`child_${index + 1}_status`, child.status);
        formDataToSubmit.append(`child_${index + 1}_courseDetails`, child.courseDetails);
        formDataToSubmit.append(`child_${index + 1}_workDetails`, child.workDetails);
      });

      // Additional generation as individual fields
      formData.additionalGeneration.forEach((gen, index) => {
        formDataToSubmit.append(`additional_generation_${index + 1}_name`, gen.name);
        formDataToSubmit.append(`additional_generation_${index + 1}_relation`, gen.relation);
      });

      // Documents
      formData.documents.forEach((file, index) => {
        formDataToSubmit.append(`document_${index + 1}`, file);
      });

      if (formData.profilePhoto) {
        formDataToSubmit.append('profilePhoto', formData.profilePhoto);
      }

      if (formData.familyPhoto) {
        formDataToSubmit.append('familyPhoto', formData.familyPhoto);
      }

      const response = await fetch('https://n8n.gopocket.in/webhook-test/yuvaraj', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Form submitted successfully!');
        
        // Reset form after a delay
        setTimeout(() => {
          setFormData({
            name: '',
            age: '',
            bloodGroup: '',
            profession: '',
            businessDescription: '',
            businessAddress: '',
            companyName: '',
            designation: '',
            wives: [{ name: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '' }],
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
          setIsSubmitted(false);
          setProgress(0);
        }, 3000);
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

  // Success message component
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="animate-scale-in">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Registration Successful!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for submitting your registration form. We have received your information successfully.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800 font-medium">
                  Your registration has been processed and you will be contacted shortly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <span className="text-sm opacity-90">Progress</span>
              <Progress value={progress} className="flex-1 max-w-md bg-white/20 h-3" />
              <span className="text-sm opacity-90">{Math.round(progress)}% Complete</span>
            </div>
            <div className="flex justify-center items-center gap-4 mt-2">
              <span className="text-xs opacity-75">Step {currentStep} of {totalSteps}</span>
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
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Form
                      <Send className="w-5 h-5" />
                    </>
                  )}
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

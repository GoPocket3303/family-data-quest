import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PersonalFamilyStep from './form-steps/PersonalFamilyStep';
import ContactDocumentsStep from './form-steps/ContactDocumentsStep';
import ReviewStep from './form-steps/ReviewStep';
import { LoadingOverlay } from '@/components/ui/loading';

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
    bloodGroup: string;
    occupation: string;
    businessDescription: string;
    businessAddress: string;
    companyName: string;
    designation: string;
    whatsappNo: string;
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
    whatsappNo: string;
  }>;
  
  // Generation Info
  fatherName: string;
  fatherWhatsapp: string;
  motherName: string;
  motherWhatsapp: string;
  mothers: Array<{
    name: string;
    whatsapp: string;
  }>;
  grandFatherName: string;
  grandMotherName: string;
  grandMothers: Array<{
    name: string;
  }>;
  greatGrandFatherName: string;
  greatGrandMotherName: string;
  greatGrandMothers: Array<{
    name: string;
  }>;
  hasAdditionalGeneration: boolean;
  additionalGeneration: Array<{
    name: string; // Great Grandfather's Name
    relation: string; // Great Grandmother's Name
  }>;
  
  // Contact Info
  cast: string;
  address: string;
  mobileNo: string;
  additionalMobileNo: string;
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
    wives: [{ name: '', bloodGroup: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '', whatsappNo: '' }],
    hasChildren: false,
    childrenCount: 0,
    children: [],
    fatherName: '',
    fatherWhatsapp: '',
    motherName: '',
    motherWhatsapp: '',
    mothers: [],
    grandFatherName: '',
    grandMotherName: '',
    grandMothers: [],
    greatGrandFatherName: '',
    greatGrandMotherName: '',
    greatGrandMothers: [],
    hasAdditionalGeneration: false,
    additionalGeneration: [],
    cast: '',
    address: '',
    mobileNo: '',
    additionalMobileNo: '',
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

  const calculateProgress = () => {
    const requiredFields = [
      'name', 'age', 'bloodGroup', 'profession', 'cast', 'fatherName', 'motherName', 'address', 'mobileNo', 'whatsappNo', 'mailId'
    ];
    
    let completedFields = 0;
    let totalFields = requiredFields.length;
    
    requiredFields.forEach(field => {
      if (formData[field as keyof FormData] && formData[field as keyof FormData] !== '') {
        completedFields++;
      }
    });
    
    if (formData.profession === 'business') {
      totalFields += 2;
      if (formData.businessDescription) completedFields++;
      if (formData.businessAddress) completedFields++;
    } else if (formData.profession === 'salaried') {
      totalFields += 2;
      if (formData.companyName) completedFields++;
      if (formData.designation) completedFields++;
    }
    
    formData.wives.forEach((wife, index) => {
      if (wife.name) {
        totalFields += 2;
        completedFields++;
        if (wife.occupation) completedFields++;
        
        if (wife.occupation === 'business') {
          totalFields += 2;
          if (wife.businessDescription) completedFields++;
          if (wife.businessAddress) completedFields++;
        } else if (wife.occupation === 'salaried') {
          totalFields += 2;
          if (wife.companyName) completedFields++;
          if (wife.designation) completedFields++;
        }
      }
    });
    
    if (formData.hasChildren) {
      formData.children.forEach((child, index) => {
        totalFields += 4;
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
    
    if (formData.hasAdditionalGeneration) {
      formData.additionalGeneration.forEach((gen, index) => {
        totalFields += 2;
        if (gen.name) completedFields++;
        if (gen.relation) completedFields++;
      });
    }
    
    totalFields += 1;
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

  const generatePDF = async (formData: FormData) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    const addNewPageIfNeeded = (requiredHeight = 20) => {
      if (yPosition + requiredHeight > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }
    };
    
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const title = 'User Registration Form / பயனர் பதிவு படிவம்';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 25);
    
    yPosition = 50;
    doc.setTextColor(0, 0, 0);
    
    const addSectionHeader = (title: string, titleTamil: string) => {
      addNewPageIfNeeded(30);
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, yPosition - 5, contentWidth, 20, 'F');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text(`${title} / ${titleTamil}`, margin + 5, yPosition + 8);
      doc.setTextColor(0, 0, 0);
      yPosition += 25;
    };
    
    const addField = (label: string, labelTamil: string, value: string) => {
      addNewPageIfNeeded(15);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${label} / ${labelTamil}:`, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      
      const maxWidth = contentWidth - 80;
      const splitValue = doc.splitTextToSize(value || 'Not provided', maxWidth);
      doc.text(splitValue, margin + 80, yPosition);
      
      yPosition += Math.max(10, splitValue.length * 5);
    };
    
    addSectionHeader('Personal Information', 'தனிப்பட்ட தகவல்');
    addField('Name', 'பெயர்', formData.name);
    addField('Age', 'வயது', formData.age);
    addField('Blood Group', 'இரத்த வகை', formData.bloodGroup);
    addField('Profession', 'தொழில்', formData.profession);
    
    if (formData.profession === 'business') {
      addField('Business Description', 'வணிக விளக்கம்', formData.businessDescription);
      addField('Business Address', 'வணிக முகவரி', formData.businessAddress);
    } else if (formData.profession === 'salaried') {
      addField('Company Name', 'நிறுவன பெயர்', formData.companyName);
      addField('Designation', 'பதவி', formData.designation);
    }
    
    addField('Community', 'பட்டப்பெயர் / கூட்டம்', formData.cast);
    
    addSectionHeader('Family Information', 'குடும்ப தகவல்');
    addField('Father\'s Name', 'தந்தையின் பெயர்', formData.fatherName);
    addField('Father\'s WhatsApp', 'தந்தையின் வாட்ஸ்அப்', formData.fatherWhatsapp);
    addField('Mother\'s Name', 'தாயின் பெயர்', formData.motherName);
    addField('Mother\'s WhatsApp', 'தாயின் வாட்ஸ்அப்', formData.motherWhatsapp);
    
    formData.mothers.forEach((mother, index) => {
      if (mother.name) {
        addField(`Additional Mother ${index + 1}`, `கூடுதல் தாய் ${index + 1}`, mother.name);
        addField(`Additional Mother ${index + 1} WhatsApp`, `கூடுதல் தாய் ${index + 1} வாட்ஸ்அப்`, mother.whatsapp);
      }
    });
    
    addField('Grandfather\'s Name', 'தாத்தாவின் பெயர்', formData.grandFatherName);
    addField('Grandmother\'s Name', 'பாட்டியின் பெயர்', formData.grandMotherName);
    
    if (formData.wives.some(wife => wife.name)) {
      addSectionHeader('Wife Information', 'மனைவி தகவல்');
      formData.wives.forEach((wife, index) => {
        if (wife.name) {
          addField(`Wife ${index + 1} Name`, `மனைவி ${index + 1} பெயர்`, wife.name);
          addField(`Wife ${index + 1} Blood Group`, `மனைவி ${index + 1} இரத்த வகை`, wife.bloodGroup);
          addField(`Wife ${index + 1} Occupation`, `மனைவி ${index + 1} தொழில்`, wife.occupation);
          addField(`Wife ${index + 1} WhatsApp`, `மனைவி ${index + 1} வாட்ஸ்அப்`, wife.whatsappNo);
          
          if (wife.occupation === 'business') {
            addField(`Wife ${index + 1} Business Description`, `மனைவி ${index + 1} வணிக விளக்கம்`, wife.businessDescription);
            addField(`Wife ${index + 1} Business Address`, `மனைவி ${index + 1} வணிக முகவரி`, wife.businessAddress);
          } else if (wife.occupation === 'salaried') {
            addField(`Wife ${index + 1} Company Name`, `மனைவி ${index + 1} நிறுவன பெயர்`, wife.companyName);
            addField(`Wife ${index + 1} Designation`, `மனைவி ${index + 1} பதவி`, wife.designation);
          }
          yPosition += 10;
        }
      });
    }
    
    if (formData.hasChildren && formData.children.length > 0) {
      addSectionHeader('Children Information', 'குழந்தைகளின் தகவல்');
      formData.children.forEach((child, index) => {
        if (child.name) {
          addField(`Child ${index + 1} Name`, `குழந்தை ${index + 1} பெயர்`, child.name);
          addField(`Child ${index + 1} Age`, `குழந்தை ${index + 1} வயது`, child.age);
          addField(`Child ${index + 1} Gender`, `குழந்தை ${index + 1} பாலினம்`, child.gender);
          addField(`Child ${index + 1} Blood Group`, `குழந்தை ${index + 1} இரத்த வகை`, child.bloodGroup);
          addField(`Child ${index + 1} Status`, `குழந்தை ${index + 1} நிலை`, child.status);
          
          if (child.status === 'studying') {
            addField(`Child ${index + 1} Course Details`, `குழந்தை ${index + 1} படிப்பு விவரங்கள்`, child.courseDetails);
          } else if (child.status === 'working') {
            addField(`Child ${index + 1} Work Details`, `குழந்தை ${index + 1} வேலை விவரங்கள்`, child.workDetails);
          }
          
          addField(`Child ${index + 1} WhatsApp`, `குழந்தை ${index + 1} வாட்ஸ்அப்`, child.whatsappNo);
          yPosition += 10;
        }
      });
    }
    
    if (formData.greatGrandFatherName || formData.greatGrandMotherName || formData.hasAdditionalGeneration) {
      addSectionHeader('Generation Information', 'தலைமுறை தகவல்');
      addField('Great Grandfather\'s Name', 'மூத்த தாத்தாவின் பெயர்', formData.greatGrandFatherName);
      addField('Great Grandmother\'s Name', 'மூத்த பாட்டியின் பெயர்', formData.greatGrandMotherName);
      
      if (formData.hasAdditionalGeneration) {
        formData.additionalGeneration.forEach((gen, index) => {
          addField(`Generation ${index + 2} Grandfather`, `தலைமுறை ${index + 2} தாத்தா`, gen.name);
          addField(`Generation ${index + 2} Grandmother`, `தலைமுறை ${index + 2} பாட்டி`, gen.relation);
        });
      }
    }
    
    addSectionHeader('Contact Information', 'தொடர்பு தகவல்');
    addField('Address', 'முகவரி', formData.address);
    addField('Mobile Number', 'மொபைல் எண்', formData.mobileNo);
    if (formData.additionalMobileNo) {
      addField('Additional Mobile', 'கூடுதல் மொபைல்', formData.additionalMobileNo);
    }
    addField('WhatsApp Number', 'வாட்ஸ்அப் எண்', formData.whatsappNo);
    addField('Email ID', 'மின்னஞ்சல் முகவரி', formData.mailId);
    
    addNewPageIfNeeded(40);
    yPosition = pageHeight - 30;
    doc.setFillColor(59, 130, 246);
    doc.rect(0, yPosition - 10, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated on: ' + new Date().toLocaleDateString(), margin, yPosition);
    doc.text('Registration Form - Confidential', pageWidth - margin - 80, yPosition);
    
    return doc;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const pdfDoc = await generatePDF(formData);
      const pdfBlob = pdfDoc.output('blob');
      
      const formDataToSubmit = new FormData();
      
      formDataToSubmit.append('registrationPdf', pdfBlob, 'registration_form.pdf');
      
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('age', formData.age);
      formDataToSubmit.append('bloodGroup', formData.bloodGroup);
      formDataToSubmit.append('profession', formData.profession);
      
      if (formData.profession === 'business') {
        formDataToSubmit.append('businessDescription', formData.businessDescription);
        formDataToSubmit.append('businessAddress', formData.businessAddress);
      } else if (formData.profession === 'salaried') {
        formDataToSubmit.append('companyName', formData.companyName);
        formDataToSubmit.append('designation', formData.designation);
      }
      
      formDataToSubmit.append('hasChildren', formData.hasChildren.toString());
      formDataToSubmit.append('childrenCount', formData.childrenCount.toString());
      
      const wifeCount = formData.wives.filter(wife => wife.name.trim() !== '').length;
      formDataToSubmit.append('wifeCount', wifeCount.toString());
      
      const motherCount = 1 + formData.mothers.length;
      formDataToSubmit.append('motherCount', motherCount.toString());
      
      const grandMotherCount = (formData.grandMotherName ? 1 : 0) + formData.grandMothers.length;
      formDataToSubmit.append('grandMotherCount', grandMotherCount.toString());
      
      const generationCount = formData.hasAdditionalGeneration ? formData.additionalGeneration.length : 0;
      formDataToSubmit.append('generationCount', generationCount.toString());
      
      formDataToSubmit.append('fatherName', formData.fatherName);
      formDataToSubmit.append('fatherWhatsapp', formData.fatherWhatsapp);
      formDataToSubmit.append('motherName', formData.motherName);
      formDataToSubmit.append('motherWhatsapp', formData.motherWhatsapp);
      formDataToSubmit.append('grandFatherName', formData.grandFatherName);
      formDataToSubmit.append('grandMotherName', formData.grandMotherName);
      formDataToSubmit.append('greatGrandFatherName', formData.greatGrandFatherName);
      formDataToSubmit.append('greatGrandMotherName', formData.greatGrandMotherName);
      formDataToSubmit.append('hasAdditionalGeneration', formData.hasAdditionalGeneration.toString());
      formDataToSubmit.append('cast', formData.cast);
      formDataToSubmit.append('address', formData.address);
      formDataToSubmit.append('mobileNo', formData.mobileNo);
      formDataToSubmit.append('additionalMobileNo', formData.additionalMobileNo);
      formDataToSubmit.append('whatsappNo', formData.whatsappNo);
      formDataToSubmit.append('sameAsWhatsapp', formData.sameAsWhatsapp.toString());
      formDataToSubmit.append('mailId', formData.mailId);

      formData.wives.forEach((wife, index) => {
        if (wife.name.trim() !== '') {
          formDataToSubmit.append(`wife_${index + 1}_name`, wife.name);
          formDataToSubmit.append(`wife_${index + 1}_bloodGroup`, wife.bloodGroup);
          formDataToSubmit.append(`wife_${index + 1}_occupation`, wife.occupation);
          formDataToSubmit.append(`wife_${index + 1}_whatsappNo`, wife.whatsappNo);
          
          if (wife.occupation === 'business') {
            formDataToSubmit.append(`wife_${index + 1}_businessDescription`, wife.businessDescription);
            formDataToSubmit.append(`wife_${index + 1}_businessAddress`, wife.businessAddress);
          } else if (wife.occupation === 'salaried') {
            formDataToSubmit.append(`wife_${index + 1}_companyName`, wife.companyName);
            formDataToSubmit.append(`wife_${index + 1}_designation`, wife.designation);
          }
        }
      });

      formData.mothers.forEach((mother, index) => {
        formDataToSubmit.append(`additional_mother_${index + 1}_name`, mother.name);
        formDataToSubmit.append(`additional_mother_${index + 1}_whatsapp`, mother.whatsapp);
      });

      formData.grandMothers.forEach((grandmother, index) => {
        formDataToSubmit.append(`additional_grandmother_${index + 1}_name`, grandmother.name);
      });

      formData.greatGrandMothers.forEach((greatGrandmother, index) => {
        formDataToSubmit.append(`additional_great_grandmother_${index + 1}_name`, greatGrandmother.name);
      });

      formData.children.forEach((child, index) => {
        formDataToSubmit.append(`child_${index + 1}_name`, child.name);
        formDataToSubmit.append(`child_${index + 1}_age`, child.age);
        formDataToSubmit.append(`child_${index + 1}_gender`, child.gender);
        formDataToSubmit.append(`child_${index + 1}_bloodGroup`, child.bloodGroup);
        formDataToSubmit.append(`child_${index + 1}_status`, child.status);
        formDataToSubmit.append(`child_${index + 1}_courseDetails`, child.courseDetails);
        formDataToSubmit.append(`child_${index + 1}_workDetails`, child.workDetails);
        formDataToSubmit.append(`child_${index + 1}_whatsappNo`, child.whatsappNo);
      });

      formData.additionalGeneration.forEach((gen, index) => {
        formDataToSubmit.append(`additional_great_grandfather_${index + 2}_name`, gen.name);
        formDataToSubmit.append(`additional_great_grandmother_${index + 2}_name`, gen.relation);
      });

      formData.documents.forEach((file, index) => {
        formDataToSubmit.append(`document_${index + 1}`, file);
      });

      if (formData.profilePhoto) {
        formDataToSubmit.append('profilePhoto', formData.profilePhoto);
      }

      if (formData.familyPhoto) {
        formDataToSubmit.append('familyPhoto', formData.familyPhoto);
      }

      const response = await fetch('https://n8n.gopocket.in/webhook/yuvaraj', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Form submitted successfully!');
        
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
            wives: [{ name: '', bloodGroup: '', occupation: '', businessDescription: '', businessAddress: '', companyName: '', designation: '', whatsappNo: '' }],
            hasChildren: false,
            childrenCount: 0,
            children: [],
            fatherName: '',
            fatherWhatsapp: '',
            motherName: '',
            motherWhatsapp: '',
            mothers: [],
            grandFatherName: '',
            grandMotherName: '',
            grandMothers: [],
            greatGrandFatherName: '',
            greatGrandMotherName: '',
            greatGrandMothers: [],
            hasAdditionalGeneration: false,
            additionalGeneration: [],
            cast: '',
            address: '',
            mobileNo: '',
            additionalMobileNo: '',
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-6 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-bounce mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for submitting your registration form. We have received your information successfully.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 font-medium text-sm">
                Your registration has been processed and you will be contacted shortly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <LoadingOverlay isVisible={isSubmitting} message="Submitting your registration..." />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full">
          <div className="w-full mb-4 relative overflow-hidden">
            <div className="w-full h-32 sm:h-48 md:h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yuvaraj%20Sir-01-rGq8J9vQX8K8vZ4K4vZ4K4vZ4K.png"
                alt="Registration Banner" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.src.includes('vercel-storage')) {
                    img.src = '/lovable-uploads/Yuvaraj Sir-01.png';
                  } else if (img.src.includes('lovable-uploads')) {
                    img.style.display = 'none';
                    const textBanner = img.parentElement?.querySelector('.text-banner');
                    if (textBanner) {
                      (textBanner as HTMLElement).classList.remove('hidden');
                    }
                  }
                }}
              />
              
              <div className="text-banner absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center hidden">
                <div className="text-center px-2 sm:px-4 py-2 sm:py-4 w-full max-w-4xl">
                  <div className="text-white font-bold mb-2 sm:mb-3 leading-tight space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words hyphens-auto">
                      அருள்மிகு இருளப்பசாமி குலதெய்வத் திருக்கோவில்
                    </div>
                    <div className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg break-words hyphens-auto px-1">
                      (அகமுடையர் குலம் - கண்டெடுத்தார், கரப்பழத்தார் கூட்டம்)
                    </div>
                    <div className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg break-words hyphens-auto">
                      கலங்கல் பாதை, சூலூர் - 641402.
                    </div>
                  </div>
                  <div className="text-white/90 font-semibold space-y-1 leading-tight">
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl break-words hyphens-auto">
                      பரம்பரை
                    </div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg break-words hyphens-auto">
                      பட்டியலுக்கு தேவைப்படும் விபரங்கள்
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 sm:px-4 pb-6">
            <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 sm:p-6">
                <CardTitle className="text-center text-lg sm:text-xl md:text-2xl font-semibold leading-tight break-words hyphens-auto">
                  <span className="block word-wrap overflow-wrap-anywhere">
                    {stepTitles[currentStep - 1]}
                  </span>
                </CardTitle>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/90 text-xs sm:text-sm whitespace-nowrap shrink-0">Progress</span>
                    <Progress value={progress} className="flex-1 bg-white/20 h-2 sm:h-2.5 rounded-full" />
                    <span className="text-white/90 text-xs whitespace-nowrap shrink-0">{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all shrink-0 ${
                            step === currentStep 
                              ? 'bg-white text-purple-600 shadow-lg' 
                              : step < currentStep 
                                ? 'bg-green-500 text-white' 
                                : 'bg-white/20 text-white/70'
                          }`}>
                            {step < currentStep ? '✓' : step}
                          </div>
                          {step < 3 && <div className={`w-4 sm:w-6 h-0.5 mx-1 shrink-0 ${step < currentStep ? 'bg-green-500' : 'bg-white/20'}`} />}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-xs text-white/80">Step {currentStep} of {totalSteps}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-3 sm:p-4 md:p-6 container-safe">
                <div className="min-h-[50vh] sm:min-h-[60vh] overflow-hidden">
                  {renderStep()}
                </div>
                
                <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 sm:h-12 text-sm sm:text-base font-medium rounded-xl border-2 hover:bg-gray-50 disabled:opacity-50 order-2 sm:order-1 mobile-button text-wrap"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="text-wrap break-words">Previous</span>
                    </Button>
                    
                    {currentStep < totalSteps ? (
                      <Button
                        onClick={nextStep}
                        size="lg"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 sm:h-12 text-sm sm:text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg order-1 sm:order-2 mobile-button text-wrap"
                      >
                        <span className="text-wrap break-words">Next Step</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 sm:h-12 text-sm sm:text-base font-medium rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg min-w-[140px] sm:min-w-[160px] order-1 sm:order-2 mobile-button text-wrap"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin shrink-0" />
                            <span className="text-wrap break-words">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-wrap break-words">Submit Form</span>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;

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
      totalFields += 2; // businessDescription, businessAddress
      if (formData.businessDescription) completedFields++;
      if (formData.businessAddress) completedFields++;
    } else if (formData.profession === 'salaried') {
      totalFields += 2; // companyName, designation
      if (formData.companyName) completedFields++;
      if (formData.designation) completedFields++;
    }
    
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
    
    if (formData.hasAdditionalGeneration) {
      formData.additionalGeneration.forEach((gen, index) => {
        totalFields += 2; // name (great grandfather), relation (great grandmother)
        if (gen.name) completedFields++;
        if (gen.relation) completedFields++;
      });
    }
    
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
    
    // Header with modern design
    doc.setFillColor(37, 99, 235); // Modern blue color
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Title with better spacing
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const title = 'Registration Form';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 25);
    
    // Subtitle in Tamil
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const subtitle = 'பதிவு படிவம்';
    const subtitleWidth = doc.getTextWidth(subtitle);
    doc.text(subtitle, (pageWidth - subtitleWidth) / 2, 35);
    
    yPosition = 55;
    doc.setTextColor(0, 0, 0);
    
    // Helper function to add modern section header
    const addSectionHeader = (title: string, titleTamil: string) => {
      addNewPageIfNeeded(35);
      
      // Section header background
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, yPosition - 8, contentWidth, 25, 'F');
      
      // Section border
      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition - 8, pageWidth - margin, yPosition - 8);
      
      // Section title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text(title, margin + 5, yPosition + 3);
      
      // Tamil subtitle
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(75, 85, 99);
      doc.text(titleTamil, margin + 5, yPosition + 13);
      
      doc.setTextColor(0, 0, 0);
      yPosition += 35;
    };
    
    // Helper function to add field with modern styling
    const addField = (label: string, labelTamil: string, value: string) => {
      addNewPageIfNeeded(18);
      
      // Field background
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, yPosition - 3, contentWidth, 15, 'F');
      
      // Label
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(55, 65, 81);
      doc.text(`${label}:`, margin + 3, yPosition + 4);
      
      // Tamil label
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(`${labelTamil}:`, margin + 3, yPosition + 10);
      
      // Value
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      
      const maxWidth = contentWidth - 85;
      const splitValue = doc.splitTextToSize(value || 'Not provided / வழங்கப்படவில்லை', maxWidth);
      doc.text(splitValue, margin + 85, yPosition + 7);
      
      yPosition += Math.max(18, splitValue.length * 6);
    };
    
    // Personal Information Section
    addSectionHeader('Personal Information', 'தனிப்பட்ட தகவல்');
    addField('Name', 'பெயர்', formData.name);
    addField('Age', 'வயது', formData.age + (formData.age ? ' years / ஆண்டுகள்' : ''));
    addField('Blood Group', 'இரத்த வகை', formData.bloodGroup);
    addField('Profession', 'தொழில்', formData.profession === 'salaried' ? 'salaried/வேலை' : formData.profession);
    
    if (formData.profession === 'business') {
      addField('Business Description', 'வணிக விளக்கம்', formData.businessDescription);
      addField('Business Address', 'வணிக முகவரி', formData.businessAddress);
    } else if (formData.profession === 'salaried') {
      addField('Company Name', 'நிறுவன பெயர்', formData.companyName);
      addField('Designation', 'பதவி', formData.designation);
    }
    
    addField('பட்டப்பெயர் / கூட்டம்', 'Community', formData.cast);
    
    // Family Information Section
    addSectionHeader('Family Information', 'குடும்ப தகவல்');
    addField('Father\'s Name', 'தந்தையின் பெயர்', formData.fatherName);
    addField('Father\'s WhatsApp', 'தந்தையின் வாட்ஸ்அப்', formData.fatherWhatsapp);
    addField('Mother\'s Name', 'தாயின் பெயர்', formData.motherName);
    addField('Mother\'s WhatsApp', 'தாயின் வாட்ஸ்அப்', formData.motherWhatsapp);
    
    // Additional mothers
    formData.mothers.forEach((mother, index) => {
      if (mother.name) {
        addField(`Additional Mother ${index + 1}`, `கூடுதல் தாய் ${index + 1}`, mother.name);
        addField(`Additional Mother ${index + 1} WhatsApp`, `கூடுதல் தாய் ${index + 1} வாட்ஸ்அப்`, mother.whatsapp);
      }
    });
    
    addField('Grandfather\'s Name', 'தாத்தாவின் பெயர்', formData.grandFatherName);
    addField('Grandmother\'s Name', 'பாட்டியின் பெயர்', formData.grandMotherName);
    
    // Wife Information
    if (formData.wives.some(wife => wife.name)) {
      addSectionHeader('Wife Information', 'மனைவி தகவல்');
      formData.wives.forEach((wife, index) => {
        if (wife.name) {
          addField(`Wife ${index + 1} Name`, `மனைவி ${index + 1} பெயர்`, wife.name);
          addField(`Wife ${index + 1} Blood Group`, `மனைவி ${index + 1} இரத்த வகை`, wife.bloodGroup);
          addField(`Wife ${index + 1} Occupation`, `மனைவி ${index + 1} தொழில்`, wife.occupation === 'salaried' ? 'salaried/வேலை' : wife.occupation);
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
    
    // Children Information
    if (formData.hasChildren && formData.children.length > 0) {
      addSectionHeader('Children Information', 'குழந்தைகளின் தகவல்');
      formData.children.forEach((child, index) => {
        if (child.name) {
          addField(`Child ${index + 1} Name`, `குழந்தை ${index + 1} பெயர்`, child.name);
          addField(`Child ${index + 1} Age`, `குழந்தை ${index + 1} வயது`, child.age + (child.age ? ' years / ஆண்டுகள்' : ''));
          addField(`Child ${index + 1} Gender`, `குழந்தை ${index + 1} பாலினம்`, child.gender);
          addField(`Child ${index + 1} Blood Group`, `குழந்தை ${index + 1} இரத்த வகை`, child.bloodGroup);
          addField(`Child ${index + 1} Status`, `குழந்தை ${index + 1} நிலை`, child.status);
          addField(`Child ${index + 1} WhatsApp`, `குழந்தை ${index + 1} வாட்ஸ்அப்`, child.whatsappNo);
          
          if (child.status === 'studying') {
            addField(`Child ${index + 1} Course Details`, `குழந்தை ${index + 1} படிப்பு விவரங்கள்`, child.courseDetails);
          } else if (child.status === 'working') {
            addField(`Child ${index + 1} Work Details`, `குழந்தை ${index + 1} வேலை விவரங்கள்`, child.workDetails);
          }
          
          yPosition += 10;
        }
      });
    }
    
    // Generation Information
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
    
    // Contact Information Section
    addSectionHeader('Contact Information', 'தொடர்பு தகவல்');
    addField('Address', 'முகவரி', formData.address);
    addField('Mobile Number', 'மொபைல் எண்', formData.mobileNo);
    if (formData.additionalMobileNo) {
      addField('Additional Mobile', 'கூடுதல் மொபைல்', formData.additionalMobileNo);
    }
    addField('WhatsApp Number', 'வாட்ஸ்அப் எண்', formData.whatsappNo);
    addField('Email ID', 'மின்னஞ்சல் முகவரி', formData.mailId);
    
    // Modern Footer
    addNewPageIfNeeded(50);
    yPosition = pageHeight - 40;
    
    // Footer background
    doc.setFillColor(37, 99, 235);
    doc.rect(0, yPosition - 5, pageWidth, 45, 'F');
    
    // Footer content
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.text('Generated on: ' + currentDate, margin, yPosition + 10);
    doc.text('இல் உருவாக்கப்பட்டது: ' + currentDate, margin, yPosition + 20);
    doc.text('Registration Form - Confidential', pageWidth - margin - 80, yPosition + 10);
    doc.text('பதிவு படிவம் - ரகசியம்', pageWidth - margin - 65, yPosition + 20);
    
    return doc;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate PDF
      const pdfDoc = await generatePDF(formData);
      const pdfBlob = pdfDoc.output('blob');
      
      const formDataToSubmit = new FormData();
      
      // Add PDF to form data
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
      
      // Add wife count
      const wifeCount = formData.wives.filter(wife => wife.name.trim() !== '').length;
      formDataToSubmit.append('wifeCount', wifeCount.toString());
      
      // Add mother count
      const motherCount = 1 + formData.mothers.length; // Base mother + additional mothers
      formDataToSubmit.append('motherCount', motherCount.toString());
      
      // Add grandmother count
      const grandMotherCount = (formData.grandMotherName ? 1 : 0) + formData.grandMothers.length;
      formDataToSubmit.append('grandMotherCount', grandMotherCount.toString());
      
      // Add generation count
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
    <>
      <LoadingOverlay isVisible={isSubmitting} message="Submitting your registration..." />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-5xl mx-auto">
          {/* Banner Image */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/fd6d0981-165c-4d68-9983-66ac2f2f8774.png" 
              alt="Banner" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
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
    </>
  );
};

export default MultiStepForm;

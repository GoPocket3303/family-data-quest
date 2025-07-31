
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import FamilyInfoStep from './form-steps/FamilyInfoStep';
import ContactInfoStep from './form-steps/ContactInfoStep';
import PersonalFamilyStep from './form-steps/PersonalFamilyStep';
import ChildrenInfoStep from './form-steps/ChildrenInfoStep';
import DocumentsStep from './form-steps/DocumentsStep';
import ContactDocumentsStep from './form-steps/ContactDocumentsStep';
import GenerationInfoStep from './form-steps/GenerationInfoStep';
import ReviewStep from './form-steps/ReviewStep';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  community: string;
  status: string;
  courseDetails: string;
  workDetails: string;
  whatsappNo: string;
}

interface FamilyMember {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  status: string;
  courseDetails: string;
  workDetails: string;
  whatsappNo: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  mobileNo: string;
  additionalMobileNo: string;
  sameAsWhatsapp: boolean;
  mailId: string;
}

interface PersonalFamily {
  fatherName: string;
  motherName: string;
  spouseName: string;
  maritalStatus: string;
  marriageDate: string;
  marriagePlace: string;
}

interface ChildrenInfo {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  status: string;
  courseDetails: string;
  workDetails: string;
  whatsappNo: string;
}

interface GenerationInfo {
  name: string;
  relation: string;
  details: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  familyInfo: FamilyMember[];
  contactInfo: ContactInfo;
  personalFamily: PersonalFamily;
  childrenInfo: ChildrenInfo[];
  documents: File[];
  generationInfo: GenerationInfo[];
  hasChildren: boolean;
  childrenCount: number;
  children: ChildrenInfo[];
  profilePhoto: File | null;
  familyPhoto: File | null;
  fatherName: string;
  motherName: string;
  grandFatherName: string;
  grandMotherName: string;
  greatGrandFatherName: string;
  greatGrandMotherName: string;
  hasAdditionalGeneration: boolean;
  additionalGeneration: { name: string; relation: string }[];
  mobileNo: string;
  additionalMobileNo: string;
  sameAsWhatsapp: boolean;
  whatsappNo: string;
  mailId: string;
  address: string;
}

const initialFormData: FormData = {
  personalInfo: {
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    community: '',
    status: '',
    courseDetails: '',
    workDetails: '',
    whatsappNo: '',
  },
  familyInfo: [],
  contactInfo: {
    email: '',
    phone: '',
    address: '',
    district: '',
    state: '',
    country: '',
    pinCode: '',
    mobileNo: '',
    additionalMobileNo: '',
    sameAsWhatsapp: false,
    mailId: '',
  },
  personalFamily: {
    fatherName: '',
    motherName: '',
    spouseName: '',
    maritalStatus: '',
    marriageDate: '',
    marriagePlace: '',
  },
  childrenInfo: [],
  documents: [],
  generationInfo: [],
  hasChildren: false,
  childrenCount: 0,
  children: [],
  profilePhoto: null,
  familyPhoto: null,
  fatherName: '',
  motherName: '',
  grandFatherName: '',
  grandMotherName: '',
  greatGrandFatherName: '',
  greatGrandMotherName: '',
  hasAdditionalGeneration: false,
  additionalGeneration: [],
  mobileNo: '',
  additionalMobileNo: '',
  sameAsWhatsapp: false,
  whatsappNo: '',
  mailId: '',
  address: '',
};

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 9));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    // Add title with modern styling
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185);
    doc.text('Registration Form', margin, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 20;
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(41, 128, 185);
    doc.line(margin, yPosition, 190, yPosition);
    yPosition += 15;
    
    const addSection = (title: string, titleTamil: string) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(52, 73, 94);
      doc.text(`${title} / ${titleTamil}`, margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 12;
      
      doc.setLineWidth(0.3);
      doc.setDrawColor(149, 165, 166);
      doc.line(margin, yPosition, 190, yPosition);
      yPosition += 8;
    };
    
    const addField = (label: string, value: string) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(10);
      doc.setTextColor(127, 140, 141);
      doc.text(`${label}:`, margin, yPosition);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      
      const maxWidth = 120;
      const lines = doc.splitTextToSize(value || 'N/A', maxWidth);
      doc.text(lines, margin + 50, yPosition);
      yPosition += Math.max(6, lines.length * 5);
    };
    
    // Personal Information
    addSection('Personal Information', 'தனிப்பட்ட தகவல்');
    addField('Name / பெயர்', formData.personalInfo.name);
    addField('Age / வயது', formData.personalInfo.age);
    addField('Gender / பாலினம்', formData.personalInfo.gender);
    addField('Blood Group / இரத்த வகை', formData.personalInfo.bloodGroup);
    addField('பட்டப்பெயர் / கூட்டம்', formData.personalInfo.community);
    addField('Status / நிலை', formData.personalInfo.status);
    addField('Course Details / படிப்பு விவரங்கள்', formData.personalInfo.courseDetails);
    addField('Work Details / வேலை விவரங்கள்', formData.personalInfo.workDetails);
    addField('WhatsApp Number / வாட்ஸ்அப் எண்', formData.personalInfo.whatsappNo);
    yPosition += 10;
    
    // Contact Information
    addSection('Contact Information', 'தொடர்பு தகவல்');
    addField('Mobile Number / மொபைல் எண்', formData.mobileNo);
    addField('WhatsApp Number / வாட்ஸ்அப் எண்', formData.whatsappNo);
    addField('Email / மின்னஞ்சல்', formData.mailId);
    addField('Address / முகவரி', formData.address);
    yPosition += 10;
    
    // Generation Information
    addSection('Generation Information', 'தலைமுறை தகவல்');
    addField('Father Name / தந்தை பெயர்', formData.fatherName);
    addField('Mother Name / தாய் பெயர்', formData.motherName);
    addField('Grandfather Name / தாத்தா பெயர்', formData.grandFatherName);
    addField('Grandmother Name / பாட்டி பெயர்', formData.grandMotherName);
    yPosition += 10;
    
    // Children Information
    if (formData.hasChildren && formData.children.length > 0) {
      addSection('Children Information', 'குழந்தைகள் தகவல்');
      formData.children.forEach((child, index) => {
        addField(`Child ${index + 1} Name / குழந்தை ${index + 1} பெயர்`, child.name);
        addField('Age / வயது', child.age);
        addField('Gender / பாலினம்', child.gender);
        yPosition += 5;
      });
    }
    
    // Add footer with page numbers
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(127, 140, 141);
      doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
      doc.text('Generated on: ' + new Date().toLocaleDateString(), margin, doc.internal.pageSize.height - 10);
    }
    
    doc.save(`registration-form-${formData.personalInfo.name || 'form'}.pdf`);
  };
  
  const handleSubmit = () => {
    generatePDF();
    toast({
      title: "Registration form generated!",
      description: "Your registration form has been successfully generated as a PDF.",
    })
  };

  return (
    <Card>
      <CardContent className="relative grid gap-6">
        <Progress value={(step / 9) * 100} className="absolute top-0 left-0 w-full" />
        {step === 1 && (
          <PersonalInfoStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 2 && (
          <FamilyInfoStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 3 && (
          <ContactInfoStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 4 && (
          <PersonalFamilyStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 5 && (
          <ChildrenInfoStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 6 && (
          <DocumentsStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 7 && (
          <ContactDocumentsStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 8 && (
          <GenerationInfoStep
            data={formData}
            updateData={updateData}
          />
        )}
        {step === 9 && <ReviewStep data={formData} updateData={updateData} />}
        <div className="flex justify-between">
          <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>
          {step === 9 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;

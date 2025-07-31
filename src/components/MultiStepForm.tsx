import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoStep } from './form-steps/PersonalInfoStep';
import { FamilyInfoStep } from './form-steps/FamilyInfoStep';
import { ContactInfoStep } from './form-steps/ContactInfoStep';
import { PersonalFamilyStep } from './form-steps/PersonalFamilyStep';
import { ChildrenInfoStep } from './form-steps/ChildrenInfoStep';
import { DocumentsStep } from './form-steps/DocumentsStep';
import { ContactDocumentsStep } from './form-steps/ContactDocumentsStep';
import { GenerationInfoStep } from './form-steps/GenerationInfoStep';
import { ReviewStep } from './form-steps/ReviewStep';
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

interface FormData {
  personalInfo: PersonalInfo;
  familyInfo: FamilyMember[];
  contactInfo: ContactInfo;
  personalFamily: PersonalFamily;
  childrenInfo: ChildrenInfo[];
  documents: { [key: string]: File | null };
  generationInfo: GenerationInfo[];
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
  documents: {},
  generationInfo: [],
};

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 9));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = <T extends keyof FormData>(
    stepKey: T,
    field: keyof FormData[T],
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], [field]: value },
    }));
  };

  const handleFamilyInfoChange = (index: number, field: keyof FamilyMember, value: any) => {
    const updatedFamilyInfo = [...formData.familyInfo];
    updatedFamilyInfo[index] = { ...updatedFamilyInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, familyInfo: updatedFamilyInfo }));
  };

  const handleAddFamilyMember = () => {
    setFormData(prev => ({
      ...prev,
      familyInfo: [...prev.familyInfo, {
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        status: '',
        courseDetails: '',
        workDetails: '',
        whatsappNo: '',
      }],
    }));
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updatedFamilyInfo = [...formData.familyInfo];
    updatedFamilyInfo.splice(index, 1);
    setFormData(prev => ({ ...prev, familyInfo: updatedFamilyInfo }));
  };

  const handleChildrenInfoChange = (index: number, field: keyof ChildrenInfo, value: any) => {
    const updatedChildrenInfo = [...formData.childrenInfo];
    updatedChildrenInfo[index] = { ...updatedChildrenInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, childrenInfo: updatedChildrenInfo }));
  };

  const handleAddChild = () => {
    setFormData(prev => ({
      ...prev,
      childrenInfo: [...prev.childrenInfo, {
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        status: '',
        courseDetails: '',
        workDetails: '',
        whatsappNo: '',
      }],
    }));
  };

  const handleRemoveChild = (index: number) => {
    const updatedChildrenInfo = [...formData.childrenInfo];
    updatedChildrenInfo.splice(index, 1);
    setFormData(prev => ({ ...prev, childrenInfo: updatedChildrenInfo }));
  };

  const handleGenerationInfoChange = (index: number, field: keyof GenerationInfo, value: any) => {
    const updatedGenerationInfo = [...formData.generationInfo];
    updatedGenerationInfo[index] = { ...updatedGenerationInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, generationInfo: updatedGenerationInfo }));
  };

  const handleAddGeneration = () => {
    setFormData(prev => ({
      ...prev,
      generationInfo: [...prev.generationInfo, { name: '', relation: '', details: '' }],
    }));
  };

  const handleRemoveGeneration = (index: number) => {
    const updatedGenerationInfo = [...formData.generationInfo];
    updatedGenerationInfo.splice(index, 1);
    setFormData(prev => ({ ...prev, generationInfo: updatedGenerationInfo }));
  };

  const handleDocumentChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: file },
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set up Tamil font support by using Unicode
    doc.setFont('helvetica');
    
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    // Add title with modern styling
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185); // Blue color
    doc.text('Registration Form', margin, yPosition);
    doc.setTextColor(0, 0, 0); // Reset to black
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
      
      // Add section separator
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
      
      // Handle long text by wrapping
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
    
    // Family Information
    addSection('Family Information', 'குடும்ப தகவல்');
    formData.familyInfo.forEach((member, index) => {
      addField(`Family Member ${index + 1} Name / குடும்ப உறுப்பினர் ${index + 1} பெயர்`, member.name);
      addField('Age / வயது', member.age);
      addField('Gender / பாலினம்', member.gender);
      addField('Blood Group / இரத்த வகை', member.bloodGroup);
      addField('Status / நிலை', member.status);
      addField('Course Details / படிப்பு விவரங்கள்', member.courseDetails);
      addField('Work Details / வேலை விவரங்கள்', member.workDetails);
      addField('WhatsApp Number / வாட்ஸ்அப் எண்', member.whatsappNo);
      yPosition += 5;
    });
    
    // Contact Information
    addSection('Contact Information', 'தொடர்பு தகவல்');
    addField('Email / மின்னஞ்சல்', formData.contactInfo.email);
    addField('Phone / தொலைபேசி', formData.contactInfo.phone);
    addField('Address / முகவரி', formData.contactInfo.address);
    addField('District / மாவட்டம்', formData.contactInfo.district);
    addField('State / மாநிலம்', formData.contactInfo.state);
    addField('Country / நாடு', formData.contactInfo.country);
    addField('PIN Code / அஞ்சல் குறியீடு', formData.contactInfo.pinCode);
    yPosition += 10;
    
    // Personal & Family Details
    addSection('Personal & Family Details', 'தனிப்பட்ட மற்றும் குடும்ப விவரங்கள்');
    addField('Father Name / தந்தை பெயர்', formData.personalFamily.fatherName);
    addField('Mother Name / தாய் பெயர்', formData.personalFamily.motherName);
    addField('Spouse Name / மனைவி/கணவர் பெயர்', formData.personalFamily.spouseName);
    addField('Marital Status / திருமண நிலை', formData.personalFamily.maritalStatus);
    addField('Marriage Date / திருமண தேதி', formData.personalFamily.marriageDate);
    addField('Marriage Place / திருமண இடம்', formData.personalFamily.marriagePlace);
    yPosition += 10;
    
    // Children Information
    if (formData.childrenInfo.length > 0) {
      addSection('Children Information', 'குழந்தைகள் தகவல்');
      formData.childrenInfo.forEach((child, index) => {
        addField(`Child ${index + 1} Name / குழந்தை ${index + 1} பெயர்`, child.name);
        addField('Age / வயது', child.age);
        addField('Gender / பாலினம்', child.gender);
        addField('Blood Group / இரத்த வகை', child.bloodGroup);
        addField('Status / நிலை', child.status);
        addField('Course Details / படிப்பு விவரங்கள்', child.courseDetails);
        addField('Work Details / வேலை விவரங்கள்', child.workDetails);
        addField('WhatsApp Number / வாட்ஸ்அப் எண்', child.whatsappNo);
        yPosition += 5;
      });
    }
    
    // Generation Information
    if (formData.generationInfo.length > 0) {
      addSection('Generation Information', 'தலைமுறை தகவல்');
      formData.generationInfo.forEach((gen, index) => {
        addField(`Generation ${index + 1} Name / தலைமுறை ${index + 1} பெயர்`, gen.name);
        addField('Relation / உறவு', gen.relation);
        addField('Details / விவரங்கள்', gen.details);
        yPosition += 5;
      });
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(127, 140, 141);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
      doc.text('Generated on: ' + new Date().toLocaleDateString(), margin, doc.internal.pageSize.height - 10);
    }
    
    // Save the PDF
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
            formData={formData.personalInfo}
            onChange={value => handleChange('personalInfo', 'name', value)}
            onChangeAge={value => handleChange('personalInfo', 'age', value)}
            onChangeGender={value => handleChange('personalInfo', 'gender', value)}
            onChangeBloodGroup={value => handleChange('personalInfo', 'bloodGroup', value)}
            onChangeCommunity={value => handleChange('personalInfo', 'community', value)}
            onChangeStatus={value => handleChange('personalInfo', 'status', value)}
            onChangeCourseDetails={value => handleChange('personalInfo', 'courseDetails', value)}
            onChangeWorkDetails={value => handleChange('personalInfo', 'workDetails', value)}
            onChangeWhatsappNo={value => handleChange('personalInfo', 'whatsappNo', value)}
          />
        )}
        {step === 2 && (
          <FamilyInfoStep
            familyInfo={formData.familyInfo}
            onChange={handleFamilyInfoChange}
            onAdd={handleAddFamilyMember}
            onRemove={handleRemoveFamilyMember}
          />
        )}
        {step === 3 && (
          <ContactInfoStep
            formData={formData.contactInfo}
            onChangeEmail={value => handleChange('contactInfo', 'email', value)}
            onChangePhone={value => handleChange('contactInfo', 'phone', value)}
            onChangeAddress={value => handleChange('contactInfo', 'address', value)}
            onChangeDistrict={value => handleChange('contactInfo', 'district', value)}
            onChangeState={value => handleChange('contactInfo', 'state', value)}
            onChangeCountry={value => handleChange('contactInfo', 'country', value)}
            onChangePinCode={value => handleChange('contactInfo', 'pinCode', value)}
          />
        )}
        {step === 4 && (
          <PersonalFamilyStep
            formData={formData.personalFamily}
            onChangeFatherName={value => handleChange('personalFamily', 'fatherName', value)}
            onChangeMotherName={value => handleChange('personalFamily', 'motherName', value)}
            onChangeSpouseName={value => handleChange('personalFamily', 'spouseName', value)}
            onChangeMaritalStatus={value => handleChange('personalFamily', 'maritalStatus', value)}
            onChangeMarriageDate={value => handleChange('personalFamily', 'marriageDate', value)}
            onChangeMarriagePlace={value => handleChange('personalFamily', 'marriagePlace', value)}
          />
        )}
        {step === 5 && (
          <ChildrenInfoStep
            childrenInfo={formData.childrenInfo}
            onChange={handleChildrenInfoChange}
            onAdd={handleAddChild}
            onRemove={handleRemoveChild}
          />
        )}
        {step === 6 && (
          <DocumentsStep
            documents={formData.documents}
            onChange={handleDocumentChange}
          />
        )}
        {step === 7 && (
          <ContactDocumentsStep />
        )}
        {step === 8 && (
          <GenerationInfoStep
            generationInfo={formData.generationInfo}
            onChange={handleGenerationInfoChange}
            onAdd={handleAddGeneration}
            onRemove={handleRemoveGeneration}
          />
        )}
        {step === 9 && <ReviewStep formData={formData} />}
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

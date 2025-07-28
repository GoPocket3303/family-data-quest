
import React from 'react';
import { FormData } from '../MultiStepForm';
import ContactInfoStep from './ContactInfoStep';
import DocumentsStep from './DocumentsStep';

interface ContactDocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const ContactDocumentsStep: React.FC<ContactDocumentsStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-8">
      <ContactInfoStep data={data} updateData={updateData} />
      <DocumentsStep data={data} updateData={updateData} />
    </div>
  );
};

export default ContactDocumentsStep;

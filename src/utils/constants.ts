import { Task } from '@/types';

export const taskNames: Record<Task, string> = {
  qna: 'FHIR-QA',
  api_qna: 'FHIR-RESTQA',
  identification: 'FHIR-ResourceID',
  generation: 'Note2FHIR'
};

export const taskFullNames: Record<Task, string> = {
  qna: 'FHIR Question Answering',
  api_qna: 'FHIR REST API Q&A',
  identification: 'FHIR Resource Identification',
  generation: 'Clinical Note to FHIR Conversion'
};

export const taskDescriptions: Record<Task, string> = {
  qna: 'Ability to answer questions about FHIR resources and specifications',
  api_qna: 'Understanding and generating FHIR API queries and responses',
  identification: 'Accuracy in identifying FHIR resource types and elements',
  generation: 'Capability to generate valid FHIR resources from clinical notes'
};
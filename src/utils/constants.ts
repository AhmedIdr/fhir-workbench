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
  qna: 'Ability to answer questions about FHIR general knowledge',
  api_qna: 'Ability to answer questions about FHIR API specification and usage',
  identification: 'Ability to identify FHIR resource types from a given FHIR resource',
  generation: 'Ability to generate valid FHIR resources from clinical notes'
};
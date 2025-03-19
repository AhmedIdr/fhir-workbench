'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

// Email where model submissions will be sent
const SUBMISSION_EMAIL = 'fhir.workbench@gmail.com';

export default function ModelSubmissionForm() {
  const [huggingFaceRepo, setHuggingFaceRepo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Function to validate HuggingFace repository URL
  const isValidHuggingFaceUrl = (url: string): boolean => {
    // Basic validation: should start with https://huggingface.co/ and have content after
    const trimmedUrl = url.trim();
    return trimmedUrl.startsWith('https://huggingface.co/') && 
           trimmedUrl.length > 'https://huggingface.co/'.length;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Validate input
    if (!isValidHuggingFaceUrl(huggingFaceRepo)) {
      setError('Please enter a valid HuggingFace repository URL (e.g., https://huggingface.co/your-username/model-name)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a subject and body for the email
      const subject = `FHIR Leaderboard Model Submission: ${huggingFaceRepo.split('/').pop()}`;
      const body = `Hello,

I would like to submit my model for inclusion in the FHIR Leaderboard.

HuggingFace Repository: ${huggingFaceRepo}
Submitted at: ${new Date().toLocaleString()}

Thank you!`;

      // Create a mailto link
      const mailtoLink = `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open the mailto link
      window.location.href = mailtoLink;

      // Show success message and reset form
      setSuccessMessage('Your email client has been opened with the model details. Please send the email to complete your submission.');
      setHuggingFaceRepo('');
    } catch (error) {
      console.error('Submission error:', error);
      setError(`Failed to open email client. Please email us directly at ${SUBMISSION_EMAIL} with your model URL.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full mb-16">
      <div className="bg-[#1b222d] rounded-lg p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">Submit Your Model</h2>
        <p className="text-gray-400 mb-6">
          Have a FHIR-capable model you want to include in our leaderboard? Simply provide the 
          HuggingFace repo URL below, and we'll evaluate it.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="huggingFaceRepo" className="block text-sm text-gray-300 mb-2">
              HuggingFace Repository URL
            </label>
            <input
              type="url"
              id="huggingFaceRepo"
              name="huggingFaceRepo"
              value={huggingFaceRepo}
              onChange={(e) => setHuggingFaceRepo(e.target.value)}
              className="w-full rounded-md border-0 bg-[#2d3748] py-2.5 px-3 text-gray-300 
                       placeholder:text-gray-500 focus:ring-1 focus:ring-[#f2acac] focus:outline-none"
              placeholder="e.g., https://huggingface.co/your-username/your-model"
              required
            />
            <p className="mt-2 text-xs text-gray-400">
              Enter your HuggingFace URL and click submit. An email will be opened for you to send.
            </p>
          </div>
          
          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="text-green-400 text-sm">
              {successMessage}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center bg-[#f2acac] hover:bg-[#e58c8c] text-[#161927] font-medium py-2 px-5 rounded-md transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Model'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
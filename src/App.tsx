import React from 'react';
import { Trophy, BookOpen, Database } from 'lucide-react';
import LeaderboardTable from './components/LeaderboardTable';
import ModelSubmissionForm from './components/ModelSubmissionForm';
import ModelSizeFilter from './components/ModelSizeFilter';
import TasksGrid from './components/TasksGrid';
import StatsCard from './components/StatsCard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-lighter to-accent-light">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-[#f2acac]" />
            <h1 className="text-4xl font-bold text-primary-darker">FHIR LLM Leaderboard</h1>
          </div>
          <p className="text-primary-darker max-w-2xl mx-auto">
            Compare language models' capabilities in understanding and working with FHIR (Fast Healthcare Interoperability Resources).
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <a 
              href="http://hl7.org/fhir/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-light hover:text-accent"
            >
              <BookOpen className="h-4 w-4" />
              <span>Learn about FHIR</span>
            </a>
            <a 
              href="https://huggingface.co/datasets/Aiyagh/fhir_api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-light hover:text-accent"
            >
              <Database className="h-4 w-4" />
              <span>View Dataset</span>
            </a>
          </div>
        </div>

        <StatsCard />
        <TasksGrid />
        
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <ModelSizeFilter />
          
          <LeaderboardTable />

          <div className="border-t border-primary-darker/20 pt-8">
            <ModelSubmissionForm />
          </div>
        </div>
        
        <footer className="mt-12 text-center text-sm text-primary-darker">
          <p className="mb-2">Data is regularly updated based on model evaluations against FHIR-specific tasks.</p>
          <p>All models are linked to their respective HuggingFace pages for transparency and reproducibility.</p>
          <p className="mt-2">
            <a 
              href="https://huggingface.co/datasets/Aiyagh/fhir_api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:text-accent"
            >
              View the evaluation dataset on HuggingFace
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
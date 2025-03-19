import LeaderboardTable from '@/components/LeaderboardTable';
import ModelSizeFilter from '@/components/ModelSizeFilter';
import SearchBar from '@/components/SearchBar';
import ModelSubmissionForm from '@/components/ModelSubmissionForm';
import { Flame, FileText, Database, Github } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161927] text-white py-8">
      <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 mb-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-12 w-12 text-[#f2acac]" />
            <h1 className="text-5xl font-bold text-white">FHIR Workbench</h1>
          </div>
          <p className="text-gray-400 max-w-4xl mx-auto mb-8 text-lg">
            Compare and track the latest advancements in Large Language Models across multiple benchmarks related to FHIR.
          </p>
          
          <div className="flex justify-center gap-4">
            <a 
              href="https://hl7.org/fhir/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-[#222732] hover:bg-[#2d3748] px-6 py-3 rounded-md transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Learn more about FHIR</span>
            </a>
            <a 
              href="https://huggingface.co/collections/ikim-uk-essen/fhir-workbench-67daa05d2e7d1f15f6c0b145" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-[#222732] hover:bg-[#2d3748] px-6 py-3 rounded-md transition-colors"
            >
              <Database className="h-5 w-5" />
              <span>Datasets</span>
            </a>
            <a 
              href="https://github.com/UMEssen/FHIR-Workbench" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-[#222732] hover:bg-[#2d3748] px-6 py-3 rounded-md transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10">
        <SearchBar />
        <ModelSizeFilter />
        <LeaderboardTable />
        <ModelSubmissionForm />
      </div>
      
      <footer className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 mt-16 py-6 text-center text-gray-400 text-sm">
        <p>
          FHIR Workbench evaluates large language models on FHIR-specific tasks. 
          © 2025 <a href="https://ship-ai.ikim.nrw/" target="_blank" rel="noopener noreferrer" className="text-[#f2acac] hover:underline">SHIP AI Team</a>
        </p>
      </footer>
    </main>
  );
}
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [basePath, setBasePath] = useState('/fhir-workbench');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This will get the repository name from window.location when on GitHub Pages
      const pathParts = window.location.pathname.split('/');
      if (pathParts.length > 1 && pathParts[1]) {
        setBasePath(`/${pathParts[1]}`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#222732] text-gray-200 flex items-center justify-center">
      <div className="container max-w-lg mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">404 - Page Not Found</h1>
        
        <p className="text-lg mb-8">
          The page you are looking for might be at a different location.
        </p>
        
        <div className="bg-[#2d3748] rounded-lg p-6 mb-8 border border-gray-700">
          <p className="mb-4 text-gray-400">
            This site is deployed under a specific path:
          </p>
          <code className="block bg-[#1a202c] p-3 rounded text-[#f2acac] mb-4">
            {basePath}
          </code>
          
          <p className="text-gray-400 mb-4">
            Try accessing the site at:
          </p>
          
          <a 
            href={basePath}
            className="inline-block bg-[#f2acac] text-[#222732] font-medium px-6 py-2 rounded-lg"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import fs from 'fs';
import path from 'path';

// This component writes a .nojekyll file in the output directory during build
export default function NoJekyll() {
  useEffect(() => {
    // This only runs on the client side, not during static generation
    // It's just to have the component in the tree
  }, []);

  // This runs during build time (static export)
  if (typeof window === 'undefined') {
    try {
      const outDir = path.join(process.cwd(), 'out');
      const filePath = path.join(outDir, '.nojekyll');
      
      // Check if the out directory exists
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      
      // Create the .nojekyll file if it doesn't exist
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
      }
    } catch (error) {
      // Silently fail during development as filesystem might not be accessible
    }
  }

  // This component doesn't render anything
  return null;
} 
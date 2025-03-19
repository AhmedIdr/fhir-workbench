const fs = require('fs');
const path = require('path');

// Directory to output static API JSON files
const apiDir = path.join(process.cwd(), 'out', 'api');
const submitModelDir = path.join(apiDir, 'submit-model');

// Ensure directories exist
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

if (!fs.existsSync(submitModelDir)) {
  fs.mkdirSync(submitModelDir, { recursive: true });
}

// Create a static JSON response for the submit-model API
const submitModelResponse = {
  success: true,
  message: "Model submitted successfully",
  note: "This is a static response for GitHub Pages deployment"
};

// Write the JSON file
fs.writeFileSync(
  path.join(submitModelDir, 'index.json'), 
  JSON.stringify(submitModelResponse, null, 2)
);

console.log('Generated static API JSON files in /out/api/'); 
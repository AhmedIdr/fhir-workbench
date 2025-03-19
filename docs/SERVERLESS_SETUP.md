# Setting up Serverless Functions for Email Handling

When deploying the FHIR Leaderboard to a static hosting service (like GitHub Pages), you'll need to set up serverless functions to handle the email sending functionality. This guide provides instructions for setting up serverless functions on popular platforms.

## Option 1: Netlify Functions

1. Create a `netlify.toml` file in the root of your project:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/submit-model"
     to = "/.netlify/functions/submit-model"
     status = 200
   ```

2. Create a directory for your Netlify functions:
   ```bash
   mkdir -p netlify/functions
   ```

3. Create a function to handle email submissions in `netlify/functions/submit-model.js`:
   ```javascript
   const nodemailer = require('nodemailer');

   exports.handler = async function(event, context) {
     // Only allow POST requests
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
     }

     try {
       const { huggingFaceRepo } = JSON.parse(event.body);

       // Validate the inputs
       if (!huggingFaceRepo || !huggingFaceRepo.startsWith('https://huggingface.co/')) {
         return { 
           statusCode: 400, 
           body: JSON.stringify({ error: 'Invalid HuggingFace repository URL' })
         };
       }

       // Configure email transport
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
         },
       });

       // Default email recipient
       const DEFAULT_RECIPIENT = process.env.DEFAULT_RECIPIENT_EMAIL || 'ai.yaghir@gmail.com';

       // Prepare email content
       const mailOptions = {
         from: process.env.EMAIL_USER,
         to: DEFAULT_RECIPIENT,
         subject: 'FHIR Leaderboard Model Submission',
         text: `New model submission:\n\nHuggingFace Repository: ${huggingFaceRepo}\n\nSubmitted at: ${new Date().toISOString()}`,
         html: `
           <h2>New FHIR Leaderboard Model Submission</h2>
           <p><strong>HuggingFace Repository:</strong> <a href="${huggingFaceRepo}">${huggingFaceRepo}</a></p>
           <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
         `,
       };

       // Send the email
       await transporter.sendMail(mailOptions);

       // Return success response
       return { 
         statusCode: 200, 
         body: JSON.stringify({ success: true })
       };
     } catch (error) {
       console.error('Error submitting model:', error);
       return { 
         statusCode: 500, 
         body: JSON.stringify({ error: 'Failed to submit model' })
       };
     }
   };
   ```

4. Install Netlify CLI and deploy your site:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   # Follow the prompts to set up your site
   ```

5. Set environment variables in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `DEFAULT_RECIPIENT_EMAIL`

6. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

## Option 2: Vercel Serverless Functions

1. Create a `vercel.json` file in the root of your project:
   ```json
   {
     "version": 2,
     "routes": [
       { "src": "/api/submit-model", "dest": "/api/submit-model" }
     ]
   }
   ```

2. Install Vercel CLI and deploy your site:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   # Follow the prompts to set up your site
   ```

3. Set environment variables in the Vercel dashboard:
   - Go to Project settings > Environment Variables
   - Add the following environment variables:
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `DEFAULT_RECIPIENT_EMAIL`

4. Deploy your site:
   ```bash
   vercel --prod
   ```

## Option 3: AWS Lambda + API Gateway

For more complex deployments, you can use AWS Lambda with API Gateway. A detailed setup guide for AWS Lambda is beyond the scope of this document, but here are the general steps:

1. Create an AWS Lambda function using the Node.js runtime
2. Set up API Gateway to expose your Lambda function via HTTP endpoint
3. Configure CORS for your API Gateway
4. Set environment variables for your Lambda function
5. Deploy the code from the Netlify function example above (adapted for Lambda)

## Updating the Frontend

Make sure your frontend code points to the correct API endpoint. If you're using a different URL path for your serverless function, update the fetch call in `src/components/ModelSubmissionForm.tsx` to point to the correct URL. 
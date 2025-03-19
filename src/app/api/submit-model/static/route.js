// This file is used to generate a static JSON file during build time
// that will be served as a static asset for the submit-model API

export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Model submitted successfully",
      note: "This is a static response for GitHub Pages deployment"
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
} 
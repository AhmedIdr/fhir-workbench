import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHIR Workbench',
  description: 'Compare LLMs FHIR capabilities on various tasks',
  icons: {
    icon: [
      { url: '/fhir-workbench/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/fhir-workbench/favicon.svg' }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
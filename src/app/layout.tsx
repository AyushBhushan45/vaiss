import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth/context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Lumina Books | Premium Digital eBooks & Masterclasses',
  description: 'Discover masterclass eBooks on wealth, financial independence, mental models, and high-performance entrepreneurship. Instant online reader & secure downloads.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Lumina Books | Digital eBooks & Masterclasses',
    description: 'Transform your wealth, business, and mindset with actionable digital publishing.',
    url: 'https://luminaebooks.netlify.app',
    siteName: 'Lumina Books',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop' }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased min-h-screen flex flex-col selection:bg-gold selection:text-background">
        <AuthProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

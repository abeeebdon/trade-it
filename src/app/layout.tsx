import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ReduxPersistGate from '@/store/persist-gate';
import ReduxProvider from '@/store/redux-provider';
import { ReactQueryProvider } from '@/lib/react-query';
import { Inter } from 'next/font/google';
import AOSWrapper from '@/providers/AOSProviders';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { HeaderProvider } from '@/context/HeaderContext';

const playfairDisplayHeading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
});

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jomp Shop',
  description:
    'Jomp Shop — Connecting Africa to the World, One Trade at a Time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className={`"min-h-full flex flex-col", ${inter.className}`}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {' '}
          {/* ← moved up, added disableTransitionOnChange */}
          <ReduxProvider>
            <ReduxPersistGate>
              <ReactQueryProvider>
                <AOSWrapper>
                  <HeaderProvider>
                    <Toaster />
                    {children}
                  </HeaderProvider>
                </AOSWrapper>
              </ReactQueryProvider>
            </ReduxPersistGate>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

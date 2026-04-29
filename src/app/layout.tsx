import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ReduxPersistGate from '@/store/persist-gate';
import ReduxProvider from '@/store/redux-provider';
import { ReactQueryProvider } from '@/lib/react-query';
import { Inter } from 'next/font/google';
import AOSWrapper from '@/providers/AOSProviders';
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`"min-h-full flex flex-col", ${inter.className}`}>
        <ReduxProvider>
          <ReduxPersistGate>
            <ReactQueryProvider>
              <ThemeProvider attribute="class">
                <AOSWrapper>{children}</AOSWrapper>
              </ThemeProvider>
            </ReactQueryProvider>
          </ReduxPersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}

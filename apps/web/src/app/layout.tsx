import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/Footer';
import StoreProvider from '@/providers/StoreProvider';
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/providers/AuthProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <ToastContainer />
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import Favicon from '@/public/favicon.ico';
import './globals.css';

import AppProvider from '@/providers/app-provider';
import { OrderPreviewProvider } from '@/providers/order-preview-store-provider';

import { Toaster } from '@/components/ui/toaster';

import localFont from 'next/font/local';

import Header from '@/components/navigation/header';

import Footer from '@/components/navigation/footer';
import { ModalProvider } from '@/providers/modal-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AutoRefreshToken from '@/components/auth/auto-refresh-token';

const myLocalFont = localFont({
  src: '../public/font/Nunito-VariableFont_wght.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechCell - Điện thoại, phụ kiện chính hãng',
  description: 'Khám phá ngay với Techcell - Nơi Thăng Hoa Công Nghệ!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={Favicon.src} />
      </head>
      <body className={myLocalFont.className}>
        <Toaster />
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID ?? ''}>
          <AppProvider>
            <AutoRefreshToken />
            <OrderPreviewProvider>
              <Header />
              <div className="bg-slate-100">{children}</div>
              <ModalProvider />
              <Footer />
            </OrderPreviewProvider>
          </AppProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

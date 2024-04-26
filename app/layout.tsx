import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import Favicon from '@/public/favicon.ico';
import './globals.css';

import { GetMeResponseDto } from '@techcell/node-sdk';

import AppProvider from '@/providers/app-provider';

import { Toaster } from '@/components/ui/toaster';

import { authApiRequest } from '@/apiRequests/auth';

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
  const storedCookie = cookies();
  const sessionToken = storedCookie.get('sessionToken');
  const refreshToken = storedCookie.get('refreshToken');
  let user: GetMeResponseDto | null = null;
  if (sessionToken) {
    const userData = await authApiRequest.getMe(sessionToken.value);
    user = userData.payload;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID ?? ''}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href={Favicon.src} />
        </head>
        <body className={myLocalFont.className}>
          <Toaster />
          <AppProvider
            initialSessionToken={sessionToken?.value}
            initialRefreshToken={refreshToken?.value}
            user={user}
          >
            {user && <ModalProvider userProfile={user} />}
            <Header user={user} />
            <div className="bg-slate-100">{children}</div>
            <AutoRefreshToken />
            <Footer />
          </AppProvider>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import Favicon from '@/public/favicon.ico';
import './globals.css';

import { User } from '@techcell/node-sdk';

import AppProvider from '@/providers/app-provider';

import { Toaster } from '@/components/ui/toaster';

import { authApiRequest } from '@/apiRequests/auth';

import localFont from 'next/font/local';

import Header from '@/components/navigation/header';

import Footer from '@/components/navigation/footer';
import { ModalProvider } from '@/providers/modal-provider';
import AutoRefreshToken from '@/components/auth/auto-refresh-token';

//import { Nunito as FontSans } from 'next/font/google';
// const fontSans = FontSans({
//   subsets: ['vietnamese'],
//   display: 'swap',
//   variable: '--font-sans',
// });

const myLocalFont = localFont({
  src: '../public/font/Nunito-VariableFont_wght.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechCell - Điện thoại, phụ kiện chính hãng',
  description: 'Khám phá ngay với Techcell - Nơi Thăng Hoa Công Nghệ!',
  icons: {
    icon: {
      url: Favicon.src,
      type: 'image/png',
    },
    shortcut: { url: Favicon.src, type: 'image/png' },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storedCookie = cookies();
  const sessionToken = storedCookie.get('sessionToken');
  const refreshToken = storedCookie.get('refreshToken');
  let user: User | null = null;
  if (sessionToken) {
    const userData = await authApiRequest.getMe(sessionToken.value);
    user = userData.payload;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={myLocalFont.className}>
        <Toaster />
        <AppProvider initialSessionToken={sessionToken?.value} initialRefreshToken={refreshToken?.value} user={user}>
          <ModalProvider />
          <Header user={user} />
          <div className="bg-slate-100">{children}</div>
          <Footer />
          <AutoRefreshToken />
        </AppProvider>
      </body>
    </html>
  );
}

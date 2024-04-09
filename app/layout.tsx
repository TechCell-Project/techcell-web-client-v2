import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import Favicon from '@/public/favicon.ico';
import './globals.css';

import { User } from '@techcell/node-sdk';

import AppProvider from '@/providers/app-provider';

import Header from '@/components/navigation/header';
import { Toaster } from '@/components/ui/toaster';

import { authApiRequest } from '@/apiRequests/auth';

import localFont from 'next/font/local';

//import { Nunito as FontSans } from 'next/font/google';
// const fontSans = FontSans({
//   subsets: ['vietnamese'],
//   display: 'swap',
//   variable: '--font-sans',
// });

const myLocalFont = localFont({
  src: '../public/font/Nunito-VariableFont_wght.ttf',
  display: 'swap',
})

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
  let user: User | null = null;
  if (sessionToken) {
    const userData = await authApiRequest.getMe(sessionToken.value);
    user = userData.payload;
  }

  console.log(user);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={myLocalFont.className}>
        <Toaster />
        <AppProvider inititalSessionToken={sessionToken?.value} user={user}>
          <Header user={null} />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

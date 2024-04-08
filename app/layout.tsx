import type { Metadata } from 'next';
import { Montserrat as FontSans } from 'next/font/google';
import './globals.css';
import Favicon from '@/public/favicon.ico';
import AppProvider from '@/providers/app-provider';
import { cookies } from 'next/headers';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@techcell/node-sdk';
import { authApiRequest } from '@/apiRequests/auth';

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
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
  let user: User | null = null;
  if (sessionToken) {
    const userData = await authApiRequest.getMe(sessionToken.value);
    user = userData.payload;
  }

  console.log(user);

  return (
    <html lang="en" className={fontSans.variable}>
      <body>
        <Toaster />
        <AppProvider inititalSessionToken={sessionToken?.value} user={user}>{children}</AppProvider>
      </body>
    </html>
  );
}

import React from 'react';
import Link from 'next/link';

interface NotFoundPageProps {
  description: string;
  redirectTitle: string;
  redirect: string;
}

export default function NotFoundPage({
  description,
  redirectTitle,
  redirect,
}: Readonly<NotFoundPageProps>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[100vh] gap-4">
      <h4 className="text-2xl">{description}</h4>
      <Link href={redirect}>
        <h5 className="font-semibold text-primary text-lg hover:underline-offset-1">
          {redirectTitle}
        </h5>
      </Link>
    </div>
  );
}

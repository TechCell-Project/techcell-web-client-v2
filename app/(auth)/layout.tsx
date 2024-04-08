import React from 'react';

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full max-h-[90vh] bg-login bg-repeat bg-cover p-6 sm:p-10">
      <div className='w-full sm:w-1/2 h-full sm:float-end py-auto flex flex-col items-center'>{children}</div>
    </div>
  );
}

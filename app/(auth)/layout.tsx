import React from 'react';

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-auto bg-login bg-repeat bg-cover p-6 sm:p-10">
      <div className='w-full sm:w-1/2 mr-auto sm:ml-auto sm:mr-0 h-fit py-auto flex flex-col items-center'>{children}</div>
    </div>
  );
}
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { authApiRequest } from '@/apiRequests/auth';
import NotFoundPage from '@/components/common/not-found';
import LoadingPageServer from '@/components/common/loading-server';
import { RootPath } from '@/constants';
import { handleErrorApi } from '@/lib/utils';
import { AuthConfirmEmailDto } from '@techcell/node-sdk';

export default async function ConfirmEmail({
  searchParams,
}: Readonly<{ searchParams: { hash?: string } }>) {
  const hash = searchParams.hash;

  if (!hash)
    return (
      <NotFoundPage
        description="Trang không tồn tại"
        redirectTitle="Trang chủ"
        redirect={RootPath.Home}
      />
    );

  console.log(hash);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await authApiRequest
    .confirmEmail({ hash } as AuthConfirmEmailDto)
    .then(() => {
      redirect(`${RootPath.Login}?emailConfirmed=success`);
    })
    .catch((error) => {
      console.log(error);
      const errorResponse = handleErrorApi({
        error,
      });
      console.log(errorResponse);
      redirect(`${RootPath.Login}?emailConfirmed=fail&error=${errorResponse.status}`);
    });

  return (
    <Suspense>
      <LoadingPageServer />
    </Suspense>
  );
}

'use client';

import { FcGoogle } from 'react-icons/fc';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { authApiRequest } from '@/apiRequests';
import { CASE_AUTH_LOGIN, RootPath } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { getErrorMsg, handleErrorApi } from '@/lib/utils';
import { useAppContext } from '@/providers/app-provider';
import { Suspense } from 'react';

export const Social = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const authGoogleRes = await authApiRequest.loginGoogle({
          accessTokenGoogle: tokenResponse.access_token,
        });

        await authApiRequest.auth({
          accessToken: authGoogleRes.payload.accessToken,
          refreshToken: authGoogleRes.payload.refreshToken,
          expiresAt: authGoogleRes.payload.accessTokenExpires,
        });

        setUser(authGoogleRes.payload.user);

        toast({
          variant: 'success',
          title: 'Đăng nhập thành công',
        });
        router.push(callbackUrl ?? RootPath.Home);
        router.refresh();
      } catch (error) {
        const errorResponse = handleErrorApi({ error });
        toast({
          variant: 'destructive',
          title: 'Đăng nhập thất bại',
          description: getErrorMsg(errorResponse.status, CASE_AUTH_LOGIN),
        });
      }
    },
    onError: (error) => {
      const errorResponse = handleErrorApi({ error });
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: getErrorMsg(errorResponse.status, CASE_AUTH_LOGIN),
      });
    },
  });

  const onClick = (provider: 'google' | 'facebook') => {
    // signIn(provider, {
    //   callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    // });
    console.log(provider);
  };

  return (
    <Suspense>
      <div className="flex items-center w-full gap-x-2">
        <Button size="lg" className="w-full" variant="outline" onClick={() => loginGoogle()}>
          <FcGoogle className="h-5 w-5" />
        </Button>
        {/* <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('facebook')}>
        <FaFacebook className="h-5 w-5 text-[#4267B2]" />
      </Button> */}
      </div>
    </Suspense>
  );
};

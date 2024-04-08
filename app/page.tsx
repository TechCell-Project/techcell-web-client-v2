import Image from 'next/image';
import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 to-primary">
      <p>This is home page</p>
      <LoginButton>
        <Button>Button</Button>
      </LoginButton>
    </main>
  );
}

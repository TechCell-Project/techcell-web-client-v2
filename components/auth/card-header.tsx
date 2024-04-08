import { cn } from '@/lib/utils';
import { RiLoginBoxLine } from "react-icons/ri";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <RiLoginBoxLine className='text-primary text-[48px] font-bold' />
      <p className="text-muted-foreground text-base">{label}</p>
    </div>
  );
};
